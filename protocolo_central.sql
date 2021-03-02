-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 02-Mar-2021 às 17:59
-- Versão do servidor: 5.7.31
-- versão do PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `protocolo central`
--
CREATE DATABASE IF NOT EXISTS `protocolo central` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `protocolo central`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `mensagens`
--

DROP TABLE IF EXISTS `mensagens`;
CREATE TABLE IF NOT EXISTS `mensagens` (
  `reg` int(10) NOT NULL AUTO_INCREMENT,
  `de` varchar(100) NOT NULL,
  `para` varchar(100) NOT NULL,
  `msg` varchar(255) NOT NULL,
  `data` date NOT NULL,
  PRIMARY KEY (`reg`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `protocolo`
--

DROP TABLE IF EXISTS `protocolo`;
CREATE TABLE IF NOT EXISTS `protocolo` (
  `reg` int(10) NOT NULL AUTO_INCREMENT,
  `id` int(10) DEFAULT NULL,
  `protocolo` int(15) NOT NULL,
  `data` datetime NOT NULL,
  `origem` varchar(150) CHARACTER SET latin1 NOT NULL,
  `dep_origem` varchar(150) CHARACTER SET latin1 DEFAULT ' ',
  `destino` varchar(150) CHARACTER SET latin1 NOT NULL,
  `dep_destino` varchar(150) CHARACTER SET latin1 DEFAULT ' ',
  `copia` varchar(250) CHARACTER SET latin1 NOT NULL,
  `portador` varchar(100) CHARACTER SET latin1 NOT NULL,
  `mat` varchar(150) CHARACTER SET latin1 NOT NULL,
  `situacao` varchar(100) CHARACTER SET latin1 NOT NULL,
  `carater` varchar(100) CHARACTER SET latin1 NOT NULL,
  `obs` longtext CHARACTER SET latin1,
  `ver` int(1) NOT NULL DEFAULT '0',
  `doc` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `prazo` date DEFAULT NULL,
  PRIMARY KEY (`reg`)
) ENGINE=InnoDB AUTO_INCREMENT=98897 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `reg` int(10) NOT NULL AUTO_INCREMENT,
  `login` varchar(100) NOT NULL,
  `senha` varchar(100) DEFAULT NULL,
  `criptSenha` varchar(100) NOT NULL,
  `nivel` int(1) NOT NULL,
  `nome` varchar(150) NOT NULL,
  PRIMARY KEY (`reg`)
) ENGINE=InnoDB AUTO_INCREMENT=371 DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`reg`, `login`, `senha`, `criptSenha`, `nivel`, `nome`) VALUES
(1, 'warlockzeo', 'smtqsgjh', '$2y$10$0KvxhERrE1HfioNYbNU6UeEIF6JcDzLvIBieLToqm5iFsXxoMch/2', 100, 'Mario Leandro'),
(2, 'UCI', '123456', '$2y$10$rE75rlWF8LND6cGoFUS35uSIAZXkKBAh2B0KZYSp9Q.yiS3xO0g2m', 10, 'UCIÃ¡Ã£Ãº'),
(3, 'SEDUC', '123456', '', 1, 'Secretaria de EducaÃ§Ã£o'),
(4, 'SEAD', '1809', '', 1, 'Secretaria deAdministração'),
(5, 'SEFIN', '123123', '', 1, 'Secretaria de Finanças'),
(6, 'SECSAU', '123456', '', 1, 'Secretaria de Saúde'),
(7, 'SEURB', '123456', '', 1, 'SECRETARIA DE OBRAS, URBANISMO E MEIO AMBIENTE'),
(8, 'SEAS', '147', '', 1, 'SECRETARIA DE AÇÃO SOCIAL, DESENVOLVIMENTO, TRABALHO E JUVENTUDE '),
(9, 'SEAPE', '123456', '', 1, 'SECRETARIA DE AGRICULTURA E PECUÁRIA '),
(10, 'SETURDE', '654321', '', 1, 'SECRETARIA DE TURISMO, ESPORTE, CULTURA E DESENVOLVIMENTO ECONÔMICO '),
(11, 'SEARP', '123456', '', 1, 'SECRETARIA DE APOIO ARTICULAÇÃO GOVERNAMENTAL, ADMINISTRAÇÃO DISTRITAL E PROGRAMAS ESPECIAIS '),
(13, 'PC', '102030', '$2y$10$CPG1OnL9.HTsnMky9E.rG.A5vvmhY7xJt.nSRFTi8sK.Je05a8yYq', 10, 'Protocolo Central'),
(15, 'CAIC', '123456', '', 1, 'CAIC'),
(16, 'Assessoria de Imprensa', '123456', '', 1, 'ASSESSORIA DE IMPRENSA'),
(17, 'RH', '121292', '', 1, 'RECURSOS HUMANOS'),
(18, 'Tributação', '010120', '', 1, 'TRIBUTAÇÃO'),
(19, 'Tesouraria', '123321', '', 1, 'TESOURARIA'),
(20, 'CA PA', '123456', '', 1, 'CENTRO ADMINISTRATIVO PÃO DE AÇUCAR'),
(21, 'CA GI', '123456', '', 1, 'CENTRO ADMINISTRATIVO GRAVATÁ DO IBIAPINA'),
(22, 'FUNDATA', '123456', '', 1, 'FUNDATA'),
(26, 'Departamento Jurídico', '123456', '', 1, 'Departamento Jurídico'),
(27, 'Gabinete do Prefeito', '123456', '', 1, 'Gabinete do Prefeito'),
(28, 'AST', '123456', '', 1, 'Assessoria de Transporte'),
(29, 'gmc', '123456', '', 1, 'Gerência Mun. de Convênio'),
(30, 'CPP', '123456', '', 1, 'COMISSAO PERMANENTE DE PATRIMONIO'),
(31, 'CPL', '123456', '', 1, 'CPL'),
(32, 'CM', '123456', '', 0, 'CONTADOR'),
(33, 'SEGEP', '1818', '', 1, 'SECRETARIA DE GESTÃO PÚBLICA'),
(34, 'coord mulher', 'COMUTA', '', 1, 'COORDENADORIA DA MULHER'),
(35, 'DM', '123456', '$2y$10$7YLQbNxIlijc7j4.b1v7H.6PBTHT4vXU2PiwWvDJW3oykuV8.6VNK', 1, 'DEPARTAMENTO DE PATRIMONIO'),
(39, 'segep', '123456', '', 1, 'Secretaria de gestão'),
(42, 'segep', '123456', '', 1, 'secretaria de gestão'),
(300, 'warlockzeo', 'smtqsgjh', '$2y$10$S8SvptcwL5FzrK3cKftzGe4I3p..7MQM4csKK1HAtBBMvGiAVGule', 100, 'Mario Leandro'),
(310, 'johnx', '', '$2y$10$lNhGWZF5VSDcNUCPknTf3Oyqo3s3BemhrK4RKFgyTmWkSe1YgQakm', 0, 'joãoção'),
(320, 'geovane', 'fenix1025', '$2y$10$5QaSpYYwauMt4nC/.fPQWOTvpyjQe3sBIUEwQuyP.SG1brr2sX5I2', 1, 'geovane'),
(330, 'eraldo', 'camara1718', '$2y$10$y/RAFUR.Q5IdtlpuIOPLqeIooQuESjjvZ6BlUDsyWdtb14yiKV9AO', 1, 'Eraldo'),
(340, 'jurandi', '', '$2y$10$CXN2qqjC4Fp31vSXca.48O1gEIY0MSX2Vhn/sxV3czPcl6elPf1wm', 10, 'Jurandi'),
(350, 'kaima.abbes', '', '$2y$10$IIo2IF5P/.y8PDZuBITRCOrUHEaG3OJOSXj60otQz.7YP5a6cdEge', 1, 'kaima'),
(360, 'xx', NULL, '$2y$10$6KCBeuibBdeUZgljIZ8xROl.DY510Rh9bgA/Kk7eaMsACktNgvgOa', 1, 'xxnome'),
(370, 'rogeria', NULL, '$2y$10$MPSJHd9I2L5qx7gdvdiqP.kZG7mdK8Y9oZuWnPIzoDe0umrTdxS8O', 1, 'Rogéria');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
