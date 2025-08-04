-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: evstore_db
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_id`),
  KEY `fk_cart_user` (`user_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `fk_cart_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,1,'2025-03-13 13:53:13'),(3,17,'2025-03-14 01:26:31');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `item_id` bigint NOT NULL AUTO_INCREMENT,
  `cart_id` bigint NOT NULL,
  `vehicle_id` bigint NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(38,2) NOT NULL,
  `customizations` json DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  KEY `cart_id` (`cart_id`),
  KEY `vehicle_id` (`vehicle_id`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (4,3,7,2,59990.00,'{\"color\": \"red\", \"wheels\": \"sport\"}');
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `order_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `order_status` varchar(50) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `item_id` bigint NOT NULL AUTO_INCREMENT,
  `order_id` bigint NOT NULL,
  `vehicle_id` bigint NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(38,2) NOT NULL,
  `customizations` json DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  KEY `vehicle_id` (`vehicle_id`),
  KEY `FKbioxgbv59vetrxe0ejfubep1w` (`order_id`),
  CONSTRAINT `FKbioxgbv59vetrxe0ejfubep1w` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (6,7,10,1,81990.00,'{\"color\": \"red\", \"upgrades\": [\"premium sound\", \"heated seats\"]}'),(7,7,7,2,59990.00,'{\"color\": \"red\", \"wheels\": \"sport\"}'),(8,8,7,2,59990.00,'{\"color\": \"red\", \"wheels\": \"sport\"}');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `order_status` varchar(255) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `total_amount` decimal(38,2) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `fk_user` (`user_id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKel9kyl84ego2otj2accfd8mr7` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (7,'2025-03-16 02:46:50.600576','Pending','Credit Card',201970.00,17),(8,'2025-03-16 15:29:02.937613','Pending','Credit Card',119980.00,17);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `vid` varchar(20) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `exterior_color` varchar(255) DEFAULT NULL,
  `history_report` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `interior_color` varchar(255) DEFAULT NULL,
  `interior_fabric` varchar(255) DEFAULT NULL,
  `is_hot_deal` bit(1) DEFAULT NULL,
  `model` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `quantity` int NOT NULL,
  `rating` double DEFAULT NULL,
  `reviews` varchar(255) DEFAULT NULL,
  `shape` varchar(50) DEFAULT NULL,
  `model_year` int DEFAULT NULL,
  `mileage` int DEFAULT NULL,
  `trim` varchar(255) DEFAULT NULL,
  `wheels` varchar(255) DEFAULT NULL,
  `seat_layout` varchar(255) DEFAULT NULL,
  `performance_upgrade` varchar(255) DEFAULT NULL,
  `tow_hitch` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`vid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` VALUES ('v001','Tesla','High-performance electric sedan with long range and fast charging.','White','https://example.com/report1','https://example.com/model-s.jpg','Black','Leather',_binary '','Model S','Tesla Model S Plaid',129990,3,4.9,'[\"Incredible performance\", \"Luxury and comfort\"]','Sedan',2024,5000,'Plaid Performance','21-inch Turbine wheels','5-seat configuration','Plaid','No'),('v002','Porsche','Luxury electric sports car with high acceleration and range.','Black','https://example.com/report2','https://example.com/taycan.jpg','Red','Alcantara',_binary '','Taycan 4S','Porsche Taycan 4S',106990,2,4.7,'[\"Fast and smooth\", \"Handles like a dream\"]','Coupe',2023,8000,'Taycan 4S','20-inch Turbo wheels','4-seat configuration','Sport','No'),('v003','BMW','Electric SUV with cutting-edge technology and spacious interior.','Blue','https://example.com/report3','https://example.com/ix.jpg','White','Vegan Leather',_binary '\0','iX xDrive50','BMW iX xDrive50',98400,5,4.6,'[\"Comfortable and quiet\", \"Tech-packed\"]','SUV',2024,3000,'iX xDrive50','20-inch wheels','5-seat configuration','Sport','No'),('v004','Lucid','Luxury electric sedan with industry-leading range and performance.','Silver','https://example.com/report4','https://example.com/lucid-air.jpg','Black','Leather',_binary '','Air Grand Touring','Lucid Air Grand Touring',125600,4,4.8,'[\"Best range in the market\", \"Exceptional build quality\"]','Sedan',2024,2000,'Air Grand Touring','21-inch wheels','5-seat configuration','Dream','No'),('v005','Ford','Electric SUV with sporty design and fast acceleration.','Red','https://example.com/report5','https://example.com/mach-e.jpg','Black','Cloth',_binary '\0','Mustang Mach-E GT','Ford Mustang Mach-E GT',69995,6,4.5,'[\"Affordable and powerful\", \"Family-friendly\"]','SUV',2023,12000,'Mach-E GT','20-inch wheels','5-seat configuration','GT','Yes'),('v006','Rivian','All-electric pickup truck with adventure-ready features.','Green','https://example.com/report6','https://example.com/r1t.jpg','Gray','Synthetic',_binary '','R1T','Rivian R1T',73000,3,4.7,'[\"Tough and reliable\", \"Great off-road capability\"]','Truck',2023,10000,'R1T Adventure','20-inch wheels','5-seat configuration','Off-Road','Yes'),('v007','Hyundai','Stylish electric SUV with fast charging and high-tech interior.','White','https://example.com/report7','https://example.com/ioniq5.jpg','Gray','Eco Leather',_binary '\0','Ioniq 5','Hyundai Ioniq 5',51000,7,4.6,'[\"Affordable and efficient\", \"Comfortable ride\"]','SUV',2024,6000,'Ioniq 5 Long','19-inch wheels','5-seat configuration','Limited','No'),('v008','Tesla','Compact electric SUV with spacious interior and long range.','Black','https://example.com/report8','https://example.com/model-y.jpg','White','Vegan Leather',_binary '','Model Y','Tesla Model Y',52990,10,4.7,'[\"Great value\", \"Perfect for families\"]','SUV',2024,4500,'Model Y Long','19-inch wheels','5-seat configuration','Performance','Yes'),('v009','Audi','Electric sports car with luxury interior and sporty handling.','Gray','https://example.com/report9','https://example.com/e-tron.jpg','Black','Alcantara',_binary '','e-tron GT','Audi e-tron GT',104000,4,4.6,'[\"Luxury meets speed\", \"Impressive handling\"]','Coupe',2023,7000,'e-tron GT','20-inch wheels','4-seat configuration','Dynamic','No'),('v010','Mercedes-Benz','Luxury electric sedan with high-tech features and long range.','Blue','https://example.com/report10','https://example.com/eqs.jpg','Black','Leather',_binary '\0','EQS 580','Mercedes-Benz EQS 580',125950,2,4.8,'[\"Silent and smooth\", \"Packed with features\"]','Sedan',2024,3000,'EQS 580','20-inch wheels','5-seat configuration','AMG','No');
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `brand` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  `model_year` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `mileage` int NOT NULL,
  `vehicle_history` enum('No Accidents','Reported Accidents') NOT NULL,
  `description` text,
  `stock` int NOT NULL DEFAULT '1',
  `image_url` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `body_type` varchar(50) DEFAULT NULL,
  `discount` decimal(5,2) DEFAULT '0.00',
  `exterior_color` varchar(50) DEFAULT NULL,
  `interior_fabric` varchar(50) DEFAULT NULL,
  `shape` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Tesla Model 3','Tesla','Model 3',2023,49999.99,10000,'No Accidents','Long-range electric sedan',5,'image_url_here','2025-03-08 17:56:32','SUV',10.00,'Black','Leather',NULL),(2,'Nissan Leaf','Nissan','Leaf',2022,29999.99,15000,'Reported Accidents','Compact electric vehicle',3,'image_url_here','2025-03-08 17:56:32','Hatchback',15.00,'White','Cloth',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `report_type` enum('Sales','Usage') NOT NULL,
  `report_data` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`report_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `vehicle_id` bigint NOT NULL,
  `rating` int NOT NULL,
  `review_text` varchar(1000) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `vehicle_id` (`vehicle_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,17,10,5,'Amazing vehicle, highly recommend!','2025-03-18 01:42:18'),(2,17,10,4,'Great vehicle!','2025-03-18 12:33:20'),(3,17,9,4,'I love the tires of this car!','2025-03-18 12:33:48');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `date_of_birth` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `region` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2025-02-24','nafis.awsaf@eecs.com','Nafis','Awsaf','Password123','North America','customer'),(2,'2025-02-23','remo@terroni.com','Remo','Tantalo','test1234','Europe','customer'),(3,'1984-04-07','fernando@chelsea.com','Fernando','Torres','blues123','Europe','customer'),(4,'2025-02-02','leo@barca.com','Leo','Messi','$2a$10$.0rXK6pMxSnmcxBBl3zptexCEfBdFmbHrUkwg8IO..OChZy5en3Dq','Europe','customer'),(5,'1999-04-07','nafis.awsaf@evstore.com','Nafis','Awsaf','$2a$10$kqlO5BhUBRKwYwKuoKheA.Y2gF9AMFMZ5/d3DIeUB86mYTgk3fExy','North America','customer'),(6,'1990-01-01','john@example.com','John','Doe','hashed_password','North America','customer'),(7,'1985-05-15','admin@example.com','Admin','User','hashed_password','North America','customer'),(8,'2025-03-07','a.b@c.com','a','b','$2a$10$qLWqAWikwZoz86CgQFMQc.uKCyA9KzxCU2lOKX4sskJNrLA/UYfSi','Asia','customer'),(9,'1990-01-01','testuser@example.com','Test','User','$2a$10$Hukro8ltf59Ge.MEk5gul.8VvAEgIG38ItUzXloo1gsSiUAFlajUu','US','user'),(10,'2000-01-01','john.doe@example.com','John','Doe','$2a$10$oNSyZ9gOVzpKupW8bMPja.uECBwc1sEDToHMu6F3EIW0qfTiMXDLe','US','user'),(11,'2025-02-23','c.d@e.com','c','d','$2a$10$kW.syiezgTmyssvygsBSQ.fcHXqAur1HUnl9LyuEHkeLH3sDhvIxC','Europe','ROLE_USER'),(12,'2025-04-07','tom.cat@d.com','Tom','Cat','$2a$10$En/CuGpYYkHPE2edreggqOsLBZJrTEQTYNOGN8NEB40p8iabNslhO','Asia','ROLE_USER'),(13,'1989-12-31','hn.doe@example.com','hn','Doe','$2a$10$EdHKAhIwtTrts5MTkUiGv.gb4BqE2c9NkM/SDTUEriU5VPqMkWV.S','North America','USER'),(14,'1989-12-31','jhn.doe@example.com','John','oe','$2a$10$YMNOC64xyylFtSeq0C1UmuhiFd9ntrLfIyULyeWmXhJAPZxXRSaEi','North America','USER'),(15,'1989-12-31','jn.doe@example.com','Jhn','oe','$2a$10$xe.WXAGkb2kSNhNIElky7ewrx9JLpV5KqGTuiyNwMdoJHlSreDoOq','North America','USER'),(16,'1989-12-31','n.doe@example.com','','Doe','$2a$10$xnZO8ATBWfEuylrX89ucK.OVObDL77McPtK9ClXkph6m8MBmBl4u.','North America','USER'),(17,'2025-03-02','e.g@z.com','e','g','$2a$10$RLQYl14XjFVpOgC1FNWIvOB7h9vxgv4wrsfOg.Mvc3bF9oktEPibO','Asia','ROLE_USER'),(18,'2025-03-13','d.e@a.com','d','e','$2a$10$EnFu3XH/xFtFHZnBggNAq.1MIamTO8f6JlNtFjycS5zNfKoa9n.mK','North America','ROLE_USER'),(19,'2025-03-13','x.z@y.com','x','z','$2a$10$jgQ1Fw9zpGkvhNLKbq2D..3YKEj5A90wKj0g/09Ib/KD.q0X/oXz6','North America','ROLE_USER'),(20,'1995-06-14','oe@example.com','o','e','$2a$10$ck./33xdtB03mNhU9Yl7YevdAmgc.I9Iaz3AcehuRRs4TLRb/eyyi','North America','USER'),(21,'1989-12-31','adrian.kaminski@example.com','Adrian','Kaminski','$2a$10$sGMQjoeHQPmcxejiS/REQ.zfJP/aVmJKyx5raF30IR4fGAfdYvTMK','North America','USER'),(22,'1989-12-31','nargis.rafie@evstore.com','Nargis','Rafie','$2a$10$qRCG0nPKvTo05oXDmZQ8QekSCnGhOlecZsG8cP.ZH.8ZHXcn1MoNe','North America','ADMIN'),(23,'1989-12-31','nargis.rafie@admin','Nargis','Rafie','$2a$10$xxVg/ekoJUZ5xCC9UBdsRuf3DPyVusuq0MKPzdJ09yH9tGZi7ZR72','North America','ROLE_ADMIN');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicles` (
  `vehicle_id` bigint NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `payment` varchar(255) NOT NULL,
  `trim` varchar(255) NOT NULL,
  `paint` varchar(255) NOT NULL,
  `wheels` varchar(255) NOT NULL,
  `interior` varchar(255) NOT NULL,
  `seat_layout` varchar(255) NOT NULL,
  `performance_upgrade` bit(1) NOT NULL,
  `tow_hitch` bit(1) NOT NULL,
  `price` decimal(38,2) NOT NULL,
  `year` varchar(255) NOT NULL,
  `mileage` int DEFAULT NULL,
  `cover_image` varchar(255) NOT NULL,
  `hot_deal` bit(1) NOT NULL,
  `exterior_colour` varchar(255) DEFAULT NULL,
  `tires` varchar(255) DEFAULT NULL,
  `range` varchar(255) DEFAULT NULL,
  `top_speed` varchar(255) DEFAULT NULL,
  `kmh` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`vehicle_id`),
  CONSTRAINT `vehicles_chk_1` CHECK ((`type` in (_utf8mb4'New',_utf8mb4'Used'))),
  CONSTRAINT `vehicles_chk_2` CHECK ((`model` in (_utf8mb4'Model S',_utf8mb4'Model X',_utf8mb4'Model 3'))),
  CONSTRAINT `vehicles_chk_3` CHECK ((`payment` in (_utf8mb4'Cash',_utf8mb4'Finance'))),
  CONSTRAINT `vehicles_chk_4` CHECK ((`trim` in (_utf8mb4'Performance All-Wheel Drive',_utf8mb4'Long Range All-Wheel Drive',_utf8mb4'Long Range Rear-Wheel Drive'))),
  CONSTRAINT `vehicles_chk_5` CHECK ((`paint` in (_utf8mb4'White',_utf8mb4'Black',_utf8mb4'Blue',_utf8mb4'Silver',_utf8mb4'Red'))),
  CONSTRAINT `vehicles_chk_6` CHECK ((`wheels` in (_utf8mb4'Standard',_utf8mb4'Premium'))),
  CONSTRAINT `vehicles_chk_7` CHECK ((`interior` in (_utf8mb4'Black',_utf8mb4'White',_utf8mb4'Cream'))),
  CONSTRAINT `vehicles_chk_8` CHECK ((`seat_layout` in (_utf8mb4'Five Seat Interior',_utf8mb4'Seven Seat Interior')))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicles`
--

LOCK TABLES `vehicles` WRITE;
/*!40000 ALTER TABLE `vehicles` DISABLE KEYS */;
INSERT INTO `vehicles` VALUES (7,'Used','Model 3','Finance','Long Range All-Wheel Drive','Blue','Standard','Black','Five Seat Interior',_binary '',_binary '',59990.00,'2025',660,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT356,$PPSB,$W38A,$IPB2&view=STUD_FRONT34&model=m3&size=1920&size=720&bkba_opt=2&crop=1150,580,390,250&overlay=0&',_binary '','Ultra Red','Standard','584 km','201 km/h','5.2'),(9,'New','Model X','Cash','Long Range All-Wheel Drive','Black','Premium','Black','Five Seat Interior',_binary '',_binary '',121990.00,'2025',529,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX20,$PN01,$WX00,$IBE00&view=FRONT34&model=mx&size=1920&bkba_opt=2&crop=1300,600,300,230&overlay=0&',_binary '\0','Solid Black','Premium','680','301 km/h','3.9'),(10,'New','Model S','Finance','Long Range All-Wheel Drive','Red','Premium','White','Five Seat Interior',_binary '',_binary '\0',81990.00,'2025',478,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTS20,$PR01,$WS91,$ICW00&view=FRONT34&model=ms&size=1920&size=720&bkba_opt=2&crop=1150,580,390,250&overlay=0&',_binary '\0','Solid Black','Premium','680','301 km/h','4.2');
/*!40000 ALTER TABLE `vehicles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-18 20:19:00
