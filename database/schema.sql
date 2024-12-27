-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE DATABASE IF NOT EXISTS `db_ngekost_aja` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_ngekost_aja`;


CREATE TABLE IF NOT EXISTS `gambar` (
  `id_gambar` int NOT NULL AUTO_INCREMENT,
  `kategori` enum('Kamar','Kost') NOT NULL,
  `id_kost` int DEFAULT NULL,
  `id_kamar` int DEFAULT NULL,
  `link` varchar(100) NOT NULL,
  PRIMARY KEY (`id_gambar`),
  KEY `id_kamar` (`id_kamar`),
  KEY `id_kost` (`id_kost`),
  CONSTRAINT `gambar_ibfk_1` FOREIGN KEY (`id_kamar`) REFERENCES `kamar` (`kode_kamar`),
  CONSTRAINT `gambar_ibfk_2` FOREIGN KEY (`id_kost`) REFERENCES `kost` (`kode_kost`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `kamar` (
  `kode_kamar` int NOT NULL AUTO_INCREMENT,
  `kode_kost` int NOT NULL,
  `harga` decimal(10,2) NOT NULL,
  `fasilitas` text NOT NULL,
  `nama_kamar` varchar(20) NOT NULL,
  PRIMARY KEY (`kode_kamar`),
  KEY `kode_kost` (`kode_kost`),
  CONSTRAINT `kamar_ibfk_1` FOREIGN KEY (`kode_kost`) REFERENCES `kost` (`kode_kost`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS `kost` (
  `kode_kost` int NOT NULL AUTO_INCREMENT,
  `pemilik` int NOT NULL,
  `pengelola` int NOT NULL,
  `nama` varchar(50) NOT NULL,
  `alamat` varchar(50) NOT NULL,
  `deskripsi` text,
  `aturan` text NOT NULL,
  `fasilitas` text NOT NULL,
  PRIMARY KEY (`kode_kost`),
  KEY `pemilik` (`pemilik`),
  KEY `pengelola` (`pengelola`),
  CONSTRAINT `kost_ibfk_1` FOREIGN KEY (`pemilik`) REFERENCES `pemilik` (`kode_pengguna`),
  CONSTRAINT `kost_ibfk_2` FOREIGN KEY (`pengelola`) REFERENCES `pengelola` (`kode_pengguna`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `pemilik` (
  `kode_pengguna` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) NOT NULL,
  `jenis_kelamin` enum('Laki-laki','Perempuan') NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `no_hp` varchar(15) DEFAULT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  PRIMARY KEY (`kode_pengguna`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS `pengelola` (
  `kode_pengguna` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) NOT NULL,
  `jenis_kelamin` enum('Laki-laki','Perempuan') NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `no_hp` varchar(15) DEFAULT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `pemilik` int NOT NULL,
  PRIMARY KEY (`kode_pengguna`),
  KEY `pemilik` (`pemilik`),
  CONSTRAINT `pengelola_ibfk_1` FOREIGN KEY (`pemilik`) REFERENCES `pemilik` (`kode_pengguna`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS `penyewa` (
  `email` varchar(50) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `jenis_kelamin` enum('Laki-laki','Perempuan') NOT NULL,
  `pekerjaan` enum('Mahasiswa','Pegawai','Lainnya') NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `alamat` varchar(50) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS `sewa` (
  `kode_sewa` int NOT NULL AUTO_INCREMENT,
  `penyewa` varchar(50) NOT NULL,
  `kode_kamar` int NOT NULL,
  `tanggal_awal` date NOT NULL,
  `tanggal_akhir` date NOT NULL,
  `catatan` text,
  `biaya` decimal(10,2) NOT NULL,
  `STATUS` enum('digunakan','dibatalkan') NOT NULL,
  PRIMARY KEY (`kode_sewa`),
  KEY `penyewa` (`penyewa`),
  KEY `fk_sewa_kode_kamar` (`kode_kamar`),
  CONSTRAINT `fk_sewa_kode_kamar` FOREIGN KEY (`kode_kamar`) REFERENCES `kamar` (`kode_kamar`),
  CONSTRAINT `sewa_ibfk_1` FOREIGN KEY (`penyewa`) REFERENCES `penyewa` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS `ulasan` (
  `kode_ulasan` int NOT NULL AUTO_INCREMENT,
  `kode_sewa` int NOT NULL,
  `teks_ulasan` text,
  `rating` int NOT NULL,
  PRIMARY KEY (`kode_ulasan`),
  KEY `fk_ulasan_kode_sewa` (`kode_sewa`),
  CONSTRAINT `fk_ulasan_kode_sewa` FOREIGN KEY (`kode_sewa`) REFERENCES `sewa` (`kode_sewa`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

