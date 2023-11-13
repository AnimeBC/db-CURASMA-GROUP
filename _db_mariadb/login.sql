use constructora;
create table registro(
    id int primary key auto_increment,
    nombre varchar(50) not null,
    contraseña varchar(50) not null,
    tipo varchar(20) not null,
    rol int default 0,
    genero varchar(20) not null
);
create table correos(
    id int not null primary key,
    correo varchar(1000) not null
);
create table numeros(
    id int not null primary key,
    prefijo varchar(50) not null,
    numero int not null
);
/**/
