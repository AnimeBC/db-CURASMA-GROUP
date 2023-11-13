create database Proyecto;
use Proyecto;
create table persona(
    id int primary key identity(1,1),
    nombre varchar(40) not null,
    apellidos varchar(60) not null,
    dni varchar(8) not null,
    email varchar(30)not null,
    telefono  int not null,
    sexo bit not null,
    direccion varchar(50) not null,
    estado bit not null
)
go;
--procedimiento de almacenamiento
create procedure persona_insertar
@nombre varchar(40),
@apellidos varchar(60),
@dni varchar(8),
@email varchar(30),
@telefono int,
@sexo bit,
@direccion varchar(50)
as 
insert into persona(nombre,apellidos,dni,email,telefono,sexo,direccion) values (@nombre,@apellidos,@dni,@email,@telefono,@sexo,@direccion)
--insertar datos
execute persona_insertar 'diego','orsco','12345678','9898303359'.'correo@gmail.com',123456789,1,'Direccion de zona'
select * from persona
--listar datos
create proc persona_listar
as
select idpersona as ID, nombre as Nombre, apellidos as Apellidos, dni as DNI, email as Email,telefono as Telefono,sexo as Sexo, direccion as Direccion, estado as Estado 
from persona order by idpersona desc
--ejecutar la lista
exec persona_listar
select * from persona
--filtro de datos
create procedure persona_buscar
@valor varchar(40)
as
select idpersona as ID, nombre as Nombre, apellidos as Apellidos, dni as DNI, email as Email,telefono as Telefono,sexo as Sexo, direccion as Direccion, estado as Estado 
from persona where nombre like '%'+@valor+'%' or apellidos '%'+@valor+'%' or dni '%'+@valor+'%' order by idpersona asc
--ejecutar buscar
execute persona_buscar 'ia'
select * from persona