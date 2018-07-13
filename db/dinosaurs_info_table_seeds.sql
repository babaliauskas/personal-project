create table dinosaurs_info
(
    auth_id serial primary key,
    weight decimal,
    height decimal,
    food varchar(50),
    age decimal,
    dino_id integer,
    foreign key (dino_id) references dinosaurs(id),
    miniinfo text,
    info text
);