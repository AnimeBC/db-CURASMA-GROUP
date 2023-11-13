-- Crear una tabla para pacientes
CREATE TABLE Pacientes (
    id int primary key identity(1, 1),
    Nombre varchar(50) not null,
    Apellido varchar(50) not null,
    Dni int not null,
    FechaNacimiento date not null,
    Direccion varchar(100) not null,
    Telefono varchar(15) not null
);

-- Crear una tabla para médicos
CREATE TABLE Medicos (
    id int primary key identity(1, 1),
    Nombre varchar(50) not null,
    Apellido varchar(50) not null,
    Carrera varchar(50) not null,
    Telefono varchar(15) not null
);

-- Crear una tabla para citas médicas
CREATE TABLE Citas (
    id int primary key identity(1, 1),
    PacienteID int,
    MedicoID int,
    FechaCita datetime,
    Comentarios varchar(255),
    foreign key (PacienteID) references Pacientes(id),
    foreign key (MedicoID) references Medicos(id)
);

-- Crear una tabla para historias clínicas
CREATE TABLE HistoriasClinicas (
    id int primary key identity(1, 1),
    PacienteID int,
    FechaRegistro date,
    Descripcion varchar(1000) not,
    foreign key (PacienteID) references Pacientes(id)
);