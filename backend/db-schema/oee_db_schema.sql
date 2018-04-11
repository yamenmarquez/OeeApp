-- Este archivo contiene el esquema de la base de datos en Postgresql para la aplicación OEE

begin;

drop schema if exists oee cascade; --Borra el schema oee antes de crearlo nuevamente.

drop schema if exists oee_private cascade; --Borra el schema oee_private antes de crearlo nuevamente.

create schema oee;
create schema oee_private;

create table oee.np_stop (
    np_stop_id                  serial primary key,
    np_stop_name                text not null check (char_length(np_stop_name) < 256),
    np_stop_res_email           text not null check (np_stop_res_email ~* '^.+@.+\..+$'),
    np_stop_create_at           timestamp default now()
);

comment on table oee.np_stop is 'Una parada no planificada.';
comment on column oee.np_stop.np_stop_id is 'Clave primaria de la tabla oee.np_stop.';
comment on column oee.np_stop.np_stop_name is 'Nombre de la parada.';
comment on column oee.np_stop.np_stop_res_email is 'Email del la persona que será notificada cuando se registre este tipo de parada.';
comment on column oee.np_stop.np_stop_create_at is 'Fecha en la que la parada fue creada por primera vez en el sistema.';

create table oee.u (
    u_id                        serial primary key,
    u_first_name                text not null check (char_length(u_first_name) < 80),
    u_last_name                 text check (char_length(u_last_name) < 80),
    u_created_at                timestamp default now()    
);

comment on table oee.u is 'Un usuario del sistema OEE.';
comment on column oee.u.u_id is 'Clave primaria de la tabla oee.usuario_id.';
comment on column oee.u.u_first_name is 'Nombre(s) de un usario del sistema OEE.';
comment on column oee.u.u_last_name is 'Apellidos de un usuario del sistema OEE.';
comment on column oee.u.u_created_at is 'Fecha en la que el usario fue creado por primera vez en el sistema.';


create function oee.user_full_name(u oee.u) returns text as $$
  select u.u_first_name || ' ' || u.u_last_name
$$ language sql stable;

comment on function oee.user_full_name(oee.u) is 'Nombre completo de un usuario del sistema mediante la concatenación de sus nombres y sus apellidos.';

create table oee_private.u_account (
    u_id                        integer primary key references oee.u(u_id) on delete cascade,
    u_account_email             text not null unique check (u_account_email ~* '^.+@.+\..+$'),
    u_account_password_hash     text not null
);

comment on table oee_private.u_account is 'Información privada sobre la cuenta de usuario.';
comment on column oee_private.u_account.u_id is 'u_id del usuario asociado a esta cuenta.';
comment on column oee_private.u_account.u_account_email is 'Email del usuario.';
comment on column oee_private.u_account.u_account_password_hash is 'Password encriptado del usuario.';

create extension if not exists "pgcrypto";

create function oee.register_user(
  u_first_name text,
  u_last_name text,
  u_account_email text,
  u_account_password_hash text
) returns oee.u as $$
declare
  u oee.u;
begin
  insert into oee.u (u_first_name, u_last_name) values
    (u_first_name, u_last_name)
    returning * into u;

  insert into oee_private.u_account (u_id, u_account_email, u_account_password_hash) values
    (u.u_id, u_account_email, crypt(u_account_password_hash, gen_salt('bf')));

  return u;
end;
$$ language plpgsql strict security definer;

comment on function oee.register_user(text, text, text, text) is 'Registra a un usuario y crea una cuenta en el sistema.';

create type oee.jwt_token as (
  u_account_email text,
  u_id integer
);

create function oee.authenticate(
  email text,
  passwd text
) returns oee.jwt_token as $$
declare
  account oee_private.u_account;
begin
  select a.* into account
  from oee_private.u_account as a
  where a.u_account_email = $1;

  if account.u_account_password_hash = crypt(passwd, account.u_account_password_hash) then
    return (account.u_account_email, account.u_id)::oee.jwt_token;
  else
    return null;
  end if;
end;
$$ language plpgsql strict security definer;

comment on function oee.authenticate(text, text) is 'Crea un JWT token que identifica a un usuario que existe en el sistema.';

create function oee.current_user() returns oee.u as $$
  select *
  from oee.u
  where u_id = current_setting('jwt.claims.u_id')::integer
$$ language sql stable;

comment on function oee.current_user() is 'Devuelve al usuario identificado por el JWT.';

commit;