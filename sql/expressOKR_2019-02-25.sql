# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.24)
# Database: expressOKR
# Generation Time: 2019-02-25 08:30:51 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table happiness
# ------------------------------------------------------------

DROP TABLE IF EXISTS `happiness`;

CREATE TABLE `happiness` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `happiness` WRITE;
/*!40000 ALTER TABLE `happiness` DISABLE KEYS */;

INSERT INTO `happiness` (`id`, `name`, `created_at`, `updated_at`)
VALUES
	(1,'积极情绪','2019-02-25 11:59:34','2019-02-25 11:59:34'),
	(2,'投入','2019-02-25 11:59:42','2019-02-25 11:59:42'),
	(3,'人际关系','2019-02-25 11:59:54','2019-02-25 11:59:54'),
	(4,'意义','2019-02-25 12:00:02','2019-02-25 12:00:02'),
	(5,'成就','2019-02-25 12:00:11','2019-02-25 12:00:11');

/*!40000 ALTER TABLE `happiness` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table keyresults
# ------------------------------------------------------------

DROP TABLE IF EXISTS `keyresults`;

CREATE TABLE `keyresults` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `objective_id` int(11) DEFAULT NULL,
  `keyresult` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `keyresults` WRITE;
/*!40000 ALTER TABLE `keyresults` DISABLE KEYS */;

INSERT INTO `keyresults` (`id`, `objective_id`, `keyresult`, `created_at`, `updated_at`)
VALUES
	(1,1,'已完成第一部分：我们的书和它所创造的奇迹','2019-02-25 11:18:50','2019-02-25 11:18:50'),
	(2,1,'已看完第一部分和第二部分','2019-02-25 11:19:53','2019-02-25 11:19:53'),
	(3,1,'准备公开课的材料','2019-02-25 11:30:17','2019-02-25 11:30:17');

/*!40000 ALTER TABLE `keyresults` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table objectives
# ------------------------------------------------------------

DROP TABLE IF EXISTS `objectives`;

CREATE TABLE `objectives` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `objective` varchar(255) DEFAULT NULL,
  `deadline` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `objectives` WRITE;
/*!40000 ALTER TABLE `objectives` DISABLE KEYS */;

INSERT INTO `objectives` (`id`, `user_id`, `objective`, `deadline`, `created_at`, `updated_at`)
VALUES
	(1,1,'年底看完一本关于经典语录及论文学术的英文书','2019-02-25 11:17:43','2019-02-25 11:17:43','2019-02-25 11:17:43'),
	(2,1,'月底做一次公开课','2019-02-25 11:06:02','2019-02-25 11:06:02','2019-02-25 11:06:02'),
	(3,2,'一年旅游一次','2019-02-25 11:07:01','2019-02-25 11:07:01','2019-02-25 11:07:01');

/*!40000 ALTER TABLE `objectives` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table todo
# ------------------------------------------------------------

DROP TABLE IF EXISTS `todo`;

CREATE TABLE `todo` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `todos_id` int(11) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `todo` WRITE;
/*!40000 ALTER TABLE `todo` DISABLE KEYS */;

INSERT INTO `todo` (`id`, `todos_id`, `value`, `status`, `created_at`, `updated_at`)
VALUES
	(1,1,'看一部惊悚系列的纪录片',1,'2019-02-25 11:47:11','2019-02-25 11:47:11'),
	(2,1,'学习一篇新概念英语，',0,'2019-02-25 11:48:05','2019-02-25 11:48:05'),
	(3,1,'今天对同事说一句商务英语',NULL,'2019-02-25 11:50:05','2019-02-25 11:50:05');

/*!40000 ALTER TABLE `todo` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table todo-keyresult
# ------------------------------------------------------------

DROP TABLE IF EXISTS `todo-keyresult`;

CREATE TABLE `todo-keyresult` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `todos_id` int(11) DEFAULT NULL,
  `objectivers_id` int(11) DEFAULT NULL,
  `keyresult_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `todo-keyresult` WRITE;
/*!40000 ALTER TABLE `todo-keyresult` DISABLE KEYS */;

INSERT INTO `todo-keyresult` (`id`, `todos_id`, `objectivers_id`, `keyresult_id`, `created_at`, `updated_at`)
VALUES
	(1,1,1,1,'2019-02-25 11:54:21','2019-02-25 11:54:21'),
	(2,2,2,2,'2019-02-25 11:54:46',NULL);

/*!40000 ALTER TABLE `todo-keyresult` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table todos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `todos`;

CREATE TABLE `todos` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `reflect` varchar(255) DEFAULT NULL,
  `surprise` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `todos` WRITE;
/*!40000 ALTER TABLE `todos` DISABLE KEYS */;

INSERT INTO `todos` (`id`, `user_id`, `reflect`, `surprise`, `created_at`, `updated_at`)
VALUES
	(1,1,'真诚反思就是成长，想想看，什么都要继续坚持','每天保证一定听力的时间，至少15分钟的时间，集中注意力，并有意识地去记忆好的句子','2019-02-25 11:40:20','2019-02-25 11:40:20'),
	(2,2,'反思每天要做的事情','保证完成每天的任务','2019-02-25 11:45:35','2019-02-25 11:45:35');

/*!40000 ALTER TABLE `todos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user-happiness
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user-happiness`;

CREATE TABLE `user-happiness` (
  `happiness_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `todos_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`happiness_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user-happiness` WRITE;
/*!40000 ALTER TABLE `user-happiness` DISABLE KEYS */;

INSERT INTO `user-happiness` (`happiness_id`, `todos_id`, `user_id`, `created_at`, `updated_at`)
VALUES
	(1,1,1,'2019-02-25 12:04:17','2019-02-25 12:04:17'),
	(2,1,1,'2019-02-25 12:04:37','2019-02-25 12:04:37'),
	(3,1,1,'2019-02-25 12:04:51','2019-02-25 12:04:51');

/*!40000 ALTER TABLE `user-happiness` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 DEFAULT '',
  `password` int(11) DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `name`, `password`, `email`, `created_at`, `updated_at`)
VALUES
	(1,'anna',123456,'123456789@qq.com',NULL,NULL),
	(2,'bob',234567,'234567890@qq.com',NULL,NULL),
	(3,'cidy',345678,'345678901@qq.com',NULL,NULL),
	(4,'dina',456789,'456789012@qq.com',NULL,NULL);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
