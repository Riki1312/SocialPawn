-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Creato il: Mag 22, 2018 alle 09:03
-- Versione del server: 10.1.31-MariaDB
-- Versione PHP: 7.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `id5754313_brcs`
--
DROP DATABASE IF EXISTS `id5754313_brcs`;
CREATE DATABASE IF NOT EXISTS `id5754313_brcs` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `id5754313_brcs`;

-- --------------------------------------------------------

--
-- Struttura della tabella `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `idCm` int(11) NOT NULL,
  `idPs` int(11) NOT NULL,
  `idUt` int(11) NOT NULL,
  `txt` text COLLATE utf8_unicode_ci NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `follower`
--

DROP TABLE IF EXISTS `follower`;
CREATE TABLE `follower` (
  `idFl` int(11) NOT NULL,
  `idUt` int(11) NOT NULL,
  `idFollowing` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dump dei dati per la tabella `follower`
--

INSERT INTO `follower` (`idFl`, `idUt`, `idFollowing`) VALUES
(1, 1, 2),
(2, 1, 3),
(3, 2, 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE `likes` (
  `idPs` int(11) NOT NULL,
  `idUt` int(11) NOT NULL,
  `claps` bigint(20) NOT NULL,
  `likes` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `idPs` int(11) NOT NULL,
  `idUt` int(11) NOT NULL,
  `idPt` int(11) NOT NULL,
  `srcFile` text COLLATE utf8_unicode_ci NOT NULL,
  `txt` text COLLATE utf8_unicode_ci NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `posttype`
--

DROP TABLE IF EXISTS `posttype`;
CREATE TABLE `posttype` (
  `idPt` int(11) NOT NULL,
  `txt` varchar(128) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dump dei dati per la tabella `posttype`
--

INSERT INTO `posttype` (`idPt`, `txt`) VALUES
(1, 'Post privati'),
(2, 'Post pubblici');

-- --------------------------------------------------------

--
-- Struttura della tabella `priority`
--

DROP TABLE IF EXISTS `priority`;
CREATE TABLE `priority` (
  `idPr` int(11) NOT NULL,
  `txt` varchar(32) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dump dei dati per la tabella `priority`
--

INSERT INTO `priority` (`idPr`, `txt`) VALUES
(1, 'creator'),
(2, 'normal');

-- --------------------------------------------------------

--
-- Struttura della tabella `tags`
--

DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `idTg` int(11) NOT NULL,
  `txt` int(11) NOT NULL,
  `idPs` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `idUt` int(11) NOT NULL,
  `nickName` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `email` text COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `idPr` int(11) NOT NULL DEFAULT '1',
  `srcPhoto` text COLLATE utf8_unicode_ci NOT NULL,
  `bio` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`idUt`, `nickName`, `email`, `password`, `idPr`, `srcPhoto`, `bio`) VALUES
(1, 'Costa', 'c.matty.2000@gmail.com', 'password', 1, '', 'Sono il dio dei PAWN!!\r\n'),
(2, 'Riki', 'riccardo@emial.com', 'password', 1, '', 'Sono stra gud!'),
(3, 'Bello', 'ciao@gmail.com', 'password', 1, '', ''),
(9, 'Costa_', 'c.matty.2000@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 2, '', '');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`idCm`),
  ADD KEY `idPs` (`idPs`),
  ADD KEY `idUt` (`idUt`);

--
-- Indici per le tabelle `follower`
--
ALTER TABLE `follower`
  ADD PRIMARY KEY (`idFl`),
  ADD KEY `idFollowing` (`idFollowing`),
  ADD KEY `idUt` (`idUt`);

--
-- Indici per le tabelle `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`idPs`),
  ADD KEY `likes_ibfk_2` (`idUt`);

--
-- Indici per le tabelle `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`idPs`),
  ADD KEY `idUt` (`idUt`),
  ADD KEY `idPt` (`idPt`);

--
-- Indici per le tabelle `posttype`
--
ALTER TABLE `posttype`
  ADD PRIMARY KEY (`idPt`);

--
-- Indici per le tabelle `priority`
--
ALTER TABLE `priority`
  ADD PRIMARY KEY (`idPr`);

--
-- Indici per le tabelle `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`idTg`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUt`),
  ADD KEY `idPr` (`idPr`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `follower`
--
ALTER TABLE `follower`
  MODIFY `idFl` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `priority`
--
ALTER TABLE `priority`
  MODIFY `idPr` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `idUt` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`idPs`) REFERENCES `posts` (`idPs`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`idUt`) REFERENCES `users` (`idUt`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `follower`
--
ALTER TABLE `follower`
  ADD CONSTRAINT `follower_ibfk_1` FOREIGN KEY (`idUt`) REFERENCES `users` (`idUt`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `follower_ibfk_2` FOREIGN KEY (`idFollowing`) REFERENCES `users` (`idUt`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`idPs`) REFERENCES `posts` (`idPs`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`idUt`) REFERENCES `users` (`idUt`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`idPt`) REFERENCES `posttype` (`idPt`);

--
-- Limiti per la tabella `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`idPr`) REFERENCES `priority` (`idPr`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
