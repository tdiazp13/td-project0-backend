-- MySQL dump 10.13  Distrib 8.0.16, for macos10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: design_match
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `COMPANY`
--

DROP TABLE IF EXISTS `COMPANY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `COMPANY` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(300) NOT NULL,
  `ADMIN_EMAIL` varchar(100) NOT NULL,
  `ADMIN_PASSWORD` varchar(100) NOT NULL,
  `URL` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ADMIN_EMAIL_UNIQUE` (`ADMIN_EMAIL`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DESIGN`
--

DROP TABLE IF EXISTS `DESIGN`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `DESIGN` (
  `ID` varchar(45) NOT NULL,
  `DESIGNER_ID` int NOT NULL,
  `CREATED_DATE` datetime DEFAULT CURRENT_TIMESTAMP,
  `STATUS_ID` int NOT NULL DEFAULT '1',
  `REQUESTED_VALUE` decimal(10,2) NOT NULL,
  `PROJECT_ID` varchar(45) NOT NULL,
  `ORIGINAL_PATH` varchar(200) DEFAULT NULL,
  `COMPRESSED_PATH` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_design_status_idx` (`STATUS_ID`),
  KEY `fk_design_project_idx` (`PROJECT_ID`),
  KEY `fk_design_designer_idx` (`DESIGNER_ID`),
  CONSTRAINT `fk_design_designer` FOREIGN KEY (`DESIGNER_ID`) REFERENCES `DESIGNER` (`ID`),
  CONSTRAINT `fk_design_project` FOREIGN KEY (`PROJECT_ID`) REFERENCES `PROJECT` (`ID`),
  CONSTRAINT `fk_design_status` FOREIGN KEY (`STATUS_ID`) REFERENCES `DESIGN_STATUS` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DESIGN_STATUS`
--

DROP TABLE IF EXISTS `DESIGN_STATUS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `DESIGN_STATUS` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `DESCRIPTION` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DESIGN_STATUS`
--

LOCK TABLES `DESIGN_STATUS` WRITE;
/*!40000 ALTER TABLE `DESIGN_STATUS` DISABLE KEYS */;
INSERT INTO `DESIGN_STATUS` VALUES (1,'En Proceso'),(2,'Disponible');
/*!40000 ALTER TABLE `DESIGN_STATUS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DESIGNER`
--

DROP TABLE IF EXISTS `DESIGNER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `DESIGNER` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `EMAIL` varchar(50) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `LAST_NAME` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `EMAIL_UNIQUE` (`EMAIL`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PROJECT`
--

DROP TABLE IF EXISTS `PROJECT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `PROJECT` (
  `ID` varchar(45) NOT NULL,
  `NAME` varchar(200) NOT NULL,
  `DESCRIPTION` varchar(400) NOT NULL,
  `COMPANY_ID` int NOT NULL,
  `PAYING_VALUE` decimal(10,2) NOT NULL,
  `ACTIVE` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`),
  KEY `fk_project_company_idx` (`COMPANY_ID`),
  CONSTRAINT `fk_project_company` FOREIGN KEY (`COMPANY_ID`) REFERENCES `COMPANY` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-30 23:06:11
