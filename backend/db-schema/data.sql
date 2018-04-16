begin;

insert into oee.u (u_id, u_first_name, u_last_name) values
    (1, 'Yamén', 'Márquez'),
    (2, 'Veronica', 'Márquez');

alter sequence oee.u_u_id_seq restart with 3;

insert into oee_private.u_account (u_id, u_account_email, u_account_password_hash) values
    (1, 'yamenmarquez@gmail.com', '$2a$06$bEPOjfY87u7DUYZLeZU5leOI4RDt28lvJN6nyVCjg/qP71lHimMem'), --Password: 'password'
    (2, 'veronicamarquez@gmail.com', '$2a$06$bEPOjfY87u7DUYZLeZU5leOI4RDt28lvJN6nyVCjg/qP71lHimMem'); --Password: 'password'


insert into oee.np_stop (np_stop_id, np_stop_name, np_stop_res_email) values
    (1, 'Calibración', 'yamenmarquez@gmail.com'),
    (2, 'Rotura de equipo', 'kpisthatmatter@gmail.com'),
    (3, 'Falta de materiales','yamenmarquezonline@gmail.com');

alter sequence oee.np_stop_np_stop_id_seq restart with 4;

commit;
