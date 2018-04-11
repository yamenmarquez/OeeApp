begin;

insert into oee.np_stop (np_stop_id, np_stop_name, np_stop_res_email) values
    (1, 'Calibración', 'yamenmarquez@gmail.com'),
    (2, 'Rotura de equipo', 'kpisthatmatter@gmail.com'),
    (3, 'Falta de materiales','yamenmarquezonline@gmail.com');

alter sequence oee.np_stop_np_stop_id_seq restart with 4;

commit;
