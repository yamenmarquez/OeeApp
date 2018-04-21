begin;

insert into oee.u (u_id, u_first_name, u_last_name) values
    (1, 'Yamén', 'Márquez'),
    (2, 'Veronica', 'Márquez');

alter sequence oee.u_u_id_seq restart with 3;

insert into oee_private.u_account (u_id, u_account_email, u_account_password_hash) values
    (1, 'yamenmarquez@gmail.com', '$2a$06$bEPOjfY87u7DUYZLeZU5leOI4RDt28lvJN6nyVCjg/qP71lHimMem'), --Password: 'password'
    (2, 'veronicamarquez@gmail.com', '$2a$06$bEPOjfY87u7DUYZLeZU5leOI4RDt28lvJN6nyVCjg/qP71lHimMem'); --Password: 'password'


insert into oee.stop (stop_id, stop_name, stop_type, stop_res_email) values
    (1, 'Calibración', 'No planificada', 'yamenmarquez@gmail.com'),
    (2, 'Rotura de equipo', 'No planificada', 'kpisthatmatter@gmail.com'),
    (3, 'Falta de materiales', 'No planificada','yamenmarquezonline@gmail.com'),
    (4, 'Limpieza profunda', 'Planificada','yherrera@envapress.com.ec'),
    (5, 'Daño de máquina', 'No planificada','jcmiranda@envapress.com.ec'),
    (6, 'Falta de energía', 'No planificada','jcmiranda@envapress.com.ec'),
    (7, 'Almuerzo/Merienda', 'Planificada','yherrera@envapress.com.ec');


alter sequence oee.stop_stop_id_seq restart with 8;

commit;
