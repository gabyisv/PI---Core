show databases;

create database pi;
use pi;

show tables;

CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
razaoSocial VARCHAR(100),
cnpj CHAR(14)
);

DESC empresa;
INSERT INTO empresa VALUES
(DEFAULT,'Frigoríficos LTDA', '23415678912341'),
(DEFAULT,'Rocha', '98123461781902'),
(DEFAULT,'Carnes e CIA','12548901235467');

CREATE TABLE endereco (
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
logradouro VARCHAR(100),
complemento VARCHAR(100),
numero VARCHAR(10),
uf char(2),
cep CHAR(8),
fkEmpresa INT, 
	CONSTRAINT fkEnderecoEmpresa	
	FOREIGN KEY (fkEmpresa) 
	REFERENCES empresa(idEmpresa)
);
DESC endereco;

INSERT INTO endereco VALUES
(DEFAULT,'Rua Andorinha','Ao lado de um posto de gasolina','76','SP','03278000',1),
(DEFAULT,'Rua Pacheco','Ao lado de uma praça','12','SP','00112555',1),
(DEFAULT,'Rua Paulistanos','Galpão 2','76','MG','9012888',2),
(DEFAULT,'Rua Priciano','Ao lado de um hospital','4','SP','1231777',3),
(DEFAULT,'Rua Camões','Ao lado de um presídio','53','ES','10824666',3),
(DEFAULT,'Rua Fernando','Ao lado de um estacionamento','23','RJ','78492333',3);
DESC endereco;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nomeUsuario VARCHAR(100),
sobrenomeUsuario VARCHAR (100),
emailUsuario VARCHAR(100),
senhaUsuario VARCHAR(255),
cargo VARCHAR(30),
telefone VARCHAR(11),
fkEmpresa INT,
	CONSTRAINT fkUsuarioEmpresa 
	FOREIGN KEY (fkEmpresa) 
	REFERENCES empresa(idEmpresa),
fkSupervisor INT,
	FOREIGN KEY (fkSupervisor) 
    REFERENCES usuario(idUsuario)
);

DESC usuario;

INSERT INTO usuario VALUES
(1,'Gabriel','Gomez','gomez@gmail.com','@FG!123','Supervisor','11912348765',1,NULL),
(2,'Renata','Silva','silva@gmail.com','PW@344','Funcionário','11923454312',1,1),
(3,'Larissa','Costa','costa@gmail.com','..12Sr','Funcionário','11975851423',1,1);

truncate usuario;
select * from usuario;

INSERT INTO usuario VALUES
(4,'Ana','Santos','ana.santos@gmail.com','MT.123d#!','Supervisor','11943656234',2,NULL),
(5,'Paulo','Queiroz','queiroz@gmail.com','MT.352','Funcionário','11954637812',2,4),
(6,'Marcos','Fernando','fernando@gmail.com','MT.352','Funcionário','11932741646',2,4);

INSERT INTO usuario VALUES
(7,'Cintia','Hermas','hermas@gmail.com','hermais','Supervisor','11923456753',3,7),
(8,'Fabiana','Mendes','mendes@gmail.com','hermais','Funcionário','11943218765',3,NULL),
(9,'Antonio','Silva','ant.silv@gmail.com','123dmi!@s','Funcionário','11931497380',3,7),
(10,'Fabiano','Mendoça','fab.mend@gmail.com','qw!@3fds1','Funcionário','11969511207',3,7);

DESC usuario; 

SELECT * FROM usuario;

CREATE TABLE camara(
idCamara INT PRIMARY KEY,
numeroCamara INT,
fkEmpresa INT,
	CONSTRAINT fkCamaraEmpresa 
	FOREIGN KEY (fkEmpresa) 
	REFERENCES empresa (idEmpresa)
);

DESC camara;
INSERT INTO camara VALUES
(1,1,1),
(2,2,1),
(3,3,1),
(4,1,2),
(5,2,2),
(6,3,2),
(7,1,3),
(8,2,3),
(9,3,3);


CREATE TABLE quadrante (
idQuadrante INT,
pkCamara INT,
taxaVazamento DECIMAL(4,2),
	CONSTRAINT pkQuadranteCamara 
    FOREIGN KEY (pkCamara) 
    REFERENCES camara(idCamara),
    CONSTRAINT PRIMARY KEY (idQuadrante, pkCamara)
);
DESC quadrante;

INSERT INTO quadrante VALUES
(1,2,23.12);

INSERT INTO quadrante VALUES
(2,1,37.82);

CREATE TABLE sensor(
idSensor INT PRIMARY KEY,
atividade TINYINT,
modeloSensor VARCHAR(45),
idQuadrante INT,	
pkCamara INT,
	CONSTRAINT chkAtividade
	CHECK (atividade in (1,0)),
	FOREIGN KEY (idQuadrante, pkCamara) 
	REFERENCES quadrante (idQuadrante, pkCamara)
);

DESC sensor;

INSERT INTO sensor VALUES
(1,1,'MQ2',1,2);

CREATE TABLE medida(
idCaptura INT AUTO_INCREMENT,
pkSensor INT,
sensor_analogico DECIMAL(4,2),
dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (pkSensor) 
	REFERENCES sensor(idSensor),
	CONSTRAINT PRIMARY KEY (idCaptura,pkSensor)
);
INSERT INTO medida VALUES
(1,1,'05.23',DEFAULT);

DESC medida;

SELECT * FROM empresa JOIN endereco ON idEmpresa = endereco.idEndereco
JOIN medida ON idEmpresa= medida.idCaptura;


SELECT 
	CONCAT(funcionario.nomeUsuario,' ', funcionario.sobrenomeUsuario) AS Funcionário,
    ifnull(supervisor.nomeUsuario, 'Sem supervisor') AS Supervisor,
    empresa.razaoSocial AS Empresa,
	CASE
    WHEN funcionario.fkSupervisor IS NULL THEN 'Chefe'
	ELSE 'Subordinado'
    END AS Cargo
FROM
    usuario AS funcionario
		 LEFT JOIN
    usuario AS supervisor ON funcionario.fkSupervisor = supervisor.idUsuario
        JOIN
    empresa ON funcionario.fkEmpresa = empresa.idEmpresa;

SELECT camara.numeroCamara as Camara,
	   empresa.razaoSocial as Empresa,
    CASE 
    WHEN quadrante.idQuadrante = 1 THEN 'Superior Anterior Direito'
    WHEN quadrante.idQuadrante = 2 THEN 'Superior Anterior Esquerdo'
    WHEN quadrante.idQuadrante = 3 THEN 'Superior Posterior Direito'
    ELSE 'Superior Posterior ESquerdo'
    END AS Localizaçã,
	CASE
	WHEN quadrante.taxaVazamento > 30.00 THEN 'Câmara Interditada para descontaminação'
	ELSE 'Câmara dentro  do limite'
	END AS Situação
	FROM
    camara AS camara JOIN
    empresa AS empresa
    ON camara.fkEmpresa = empresa.idEmpresa
    JOIN
    quadrante AS quadrante
    ON quadrante.pkCamara = camara.idCamara;
    
     -- drop database pi;
    
    select * from usuario;


    SELECT e.idEmpresa, u.idUsuario, e.razaoSocial, e.cnpj, u.nomeUsuario FROM usuario AS u JOIN empresa AS e ON u.fkEmpresa =  e.idEmpresa ;