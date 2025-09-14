-- Host: localhost    Database: TechInTheBoxDB
-- ------------------------------------------------------
-- Server version	11.7.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `address_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `address` text NOT NULL,
  PRIMARY KEY (`address_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES
(1,2,'Providence Tower 3000, Unit 2112, Leon Guinto St., Malate, Manila');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`cart_id`),
  UNIQUE KEY `unique_cart_item` (`user_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `order_item_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `order_price` float NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `total_price` float NOT NULL,
  `status` enum('pending','shipped','delivered','cancelled') NOT NULL,
  `address` text DEFAULT NULL,
  `order_date` datetime NOT NULL,
  `delivery_date` datetime DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL,
  `category` enum('phone','laptop','accessory') NOT NULL,
  `stock` int(11) NOT NULL,
  `imgURL` text DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES
(1,'iPhone 16e','The iPhone 16e is the perfect blend of power and performance, featuring a 6.1\" OLED display and the lightning-fast A18 chip. Capture stunning photos with its 48MP camera and enjoy all-day battery life. With its sleek design and advanced features, it’s everything you need in a smartphone.',39900,'phone',87,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/iPhone16e.webp'),
(2,'iPhone 16','The iPhone 16 combines cutting-edge performance with sleek design, featuring a 6.1-inch Super Retina XDR display and the powerful A18 chip. Capture stunning photos with its 48MP Fusion main camera and 12MP ultra-wide lens, enhanced by the innovative Camera Control button for seamless shooting. Enjoy all-day battery life, thanks to a more efficient thermal design and support for Wi-Fi 7. With its customizable Action Button and support for Apple Intelligence, the iPhone 16 offers a personalized and intuitive user experience.',54990,'phone',92,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/iPhone16.webp'),
(3,'iPhone 15','The iPhone 15 introduces a vibrant 6.1-inch Super Retina XDR OLED display with Dynamic Island and a powerful A16 Bionic chip. Capture stunning photos with its 48MP main camera and enjoy enhanced battery life for all-day use. Now featuring USB-C charging and a refined design, the iPhone 15 offers a seamless and modern smartphone experience.',44990,'phone',79,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/iPhone15.webp'),
(4,'iPhone 15 Pro Max','The iPhone 15 Pro Max features a stunning 6.7-inch Super Retina XDR display with ProMotion and is powered by the A17 Pro chip for unbeatable performance. Capture incredible photos with its 48MP main camera and 5x optical zoom, making it perfect for professional-quality photography. With a titanium frame, USB-C charging, and up to 1TB storage, it\'s built for those who demand the best.',63990,'phone',53,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/iPhone15ProMax.webp'),
(5,'iPhone 14','The iPhone 14 delivers a powerful experience with its 6.1-inch Super Retina XDR OLED display and the A15 Bionic chip, ensuring smooth performance and efficiency. Capture stunning photos with its 12MP main and ultra-wide cameras, enhanced by the Photonic Engine for improved low-light performance. With features like Action Mode for stabilized video recording and Emergency SOS via satellite, the iPhone 14 combines advanced technology with user-friendly functionality.',31890,'phone',47,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/iPhone14.webp'),
(6,'iPhone 13','The iPhone 13 boasts a 6.1-inch Super Retina XDR OLED display, powered by the A15 Bionic chip, delivering smooth performance and efficiency . It features a dual 12MP rear camera system with sensor-shift optical image stabilization, enhancing low-light photography and video capabilities . With up to 19 hours of battery life, 5G connectivity, and a range of storage options, the iPhone 13 offers a balance of performance and value.',28890,'phone',38,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/iPhone13.webp'),
(7,'iPhone SE','The iPhone SE (3rd generation), released in March 2022, combines the compact design of the iPhone 8 with the powerful A15 Bionic chip, ensuring smooth performance and longevity . It features a 4.7-inch Retina HD display and supports 5G connectivity, making it a budget-friendly option for users seeking modern capabilities .',43990,'phone',23,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/iPhoneSE.webp'),
(8,'16-Inch MacBook Pro M4 Pro','The 16-inch MacBook Pro with M4 Pro chip is a powerhouse designed for professionals demanding top-tier performance. It features a 14-core CPU, 20-core GPU, and up to 64GB of unified memory, delivering exceptional speed and efficiency for demanding tasks. With a stunning Liquid Retina XDR display, up to 1600 nits peak brightness, and up to 24 hours of battery life, it\'s built to handle intensive workflows with ease. Equipped with Thunderbolt 5 ports, a 12MP Center Stage camera, and Apple Intelligence, it offers seamless connectivity and advanced AI capabilities.',161990,'laptop',47,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/16InchMBProM4Pro.webp'),
(9,'16-inch MacBook Pro M4 Max','The 16-inch MacBook Pro with M4 Max is a top-tier powerhouse, featuring a 16-core CPU and up to a 40-core GPU, ideal for demanding professional tasks like video editing and 3D rendering. It offers a stunning 16.2-inch Liquid Retina XDR display with up to 1600 nits peak brightness, delivering vivid colors and incredible detail. With up to 128GB of unified memory and Thunderbolt 5 ports, it provides unparalleled speed and connectivity for intensive workflows. Whether you\'re working with large datasets or editing high-resolution videos, the M4 Max ensures seamless performance.',228990,'laptop',55,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/16InchMBProM4Max.webp'),
(10,'14-inch MacBook Pro M4 Pro','The 14-inch MacBook Pro with the M4 Pro chip is a powerhouse designed for professionals seeking top-tier performance in a portable form factor. It features a 12-core CPU, 16-core GPU, and up to 24GB of unified memory, delivering exceptional speed and efficiency for demanding tasks. The Liquid Retina XDR display offers stunning visuals, while the inclusion of Thunderbolt 5 ports, HDMI 2.1, and a 12MP Center Stage camera ensures seamless connectivity and enhanced video conferencing capabilities. With up to 24 hours of battery life, it\'s built to keep up with your most intensive workflows.',132990,'laptop',30,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/14InchMBProM4Pro.webp'),
(11,'14-inch MacBook Pro M4 Max','The 14-inch MacBook Pro with the M4 Max chip is Apple\'s most powerful compact laptop, designed for professionals who demand top-tier performance in a portable form factor. It features a 14-core CPU, up to a 40-core GPU, and supports up to 128GB of unified memory, delivering exceptional speed and efficiency for demanding tasks. The Liquid Retina XDR display offers stunning visuals, while the inclusion of Thunderbolt 5 ports, HDMI 2.1, and a 12MP Center Stage camera ensures seamless connectivity and enhanced video conferencing capabilities. With up to 24 hours of battery life, it\'s built to keep up with your most intensive workflows.',206990,'laptop',45,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/14InchMBProM4Max.webp'),
(12,'14-inch Macbook Pro M4','The 14-inch MacBook Pro with the Apple M4 chip offers a 10-core CPU, 10-core GPU, and a 16-core Neural Engine, delivering impressive performance for everyday tasks and creative workflows . It features a 14.2-inch Liquid Retina XDR display with 3024 x 1964 resolution, providing vibrant visuals and accurate color reproduction . With up to 24 hours of battery life, it ensures extended usage without frequent charging . The laptop also includes multiple Thunderbolt 4 ports, an HDMI port, an SDXC card slot, and a headphone jack, offering versatile connectivity options .',101990,'laptop',40,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/14InchMBProM4.webp'),
(13,'Galaxy S25 Ultra','The Samsung Galaxy S25 Ultra with 256GB storage is a flagship smartphone that combines cutting-edge technology with sleek design. It boasts a 6.9-inch QHD+ Dynamic AMOLED 2X display with a 120Hz refresh rate, offering vibrant colors and smooth visuals . Powered by the Snapdragon 8 Elite processor and equipped with a versatile quad-camera system, including a 200MP main sensor, it delivers exceptional performance and photography capabilities . With its ergonomic design, S Pen support, and long-lasting battery life, the Galaxy S25 Ultra is engineered to enhance productivity and entertainment experiences.',81990,'phone',50,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/GalaxyS25Ultra.png'),
(14,'AirPods Pro 3rd Gen','Experience next-level audio with the Apple AirPods Pro (3rd Generation), featuring the advanced H3 chip for enhanced sound quality and seamless connectivity. Enjoy immersive listening with improved Active Noise Cancellation and Adaptive Transparency, allowing you to stay aware of your surroundings when needed. Designed for comfort and durability, these earbuds are sweat and water-resistant (IPX4) and offer up to 6 hours of listening time on a single charge, with the MagSafe Charging Case providing up to 30 hours of total battery life. With intuitive touch controls and personalized spatial audio, the AirPods Pro (3rd Generation) deliver a premium wireless audio experience.',10490,'accessory',85,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/AirPodsPro3rd.webp'),
(15,'AirPods Pro 2nd Gen','Experience the pinnacle of wireless audio with the AirPods Pro (2nd Generation). Powered by Apple’s advanced H2 chip, these earbuds deliver richer bass, crisper highs, and up to twice the noise cancellation of their predecessors, ensuring an immersive listening experience. Features like Adaptive Audio and Personalized Spatial Audio intelligently adjust to your environment, seamlessly blending Active Noise Cancellation with Transparency mode for optimal sound in any setting.With intuitive touch controls, extended battery life, and a MagSafe charging case equipped with Precision Finding, the AirPods Pro 2 are designed to keep you connected and in control, wherever life takes you.',14990,'accessory',90,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/AirPodsPro2nd.webp'),
(17,'AirPods Max','Experience unrivaled sound with AirPods Max — Apple’s premium over-ear headphones designed for immersive, high-fidelity audio. With custom-built drivers, active noise cancellation, and spatial audio, every note feels rich and deeply engaging. The knit mesh canopy and memory foam ear cushions offer exceptional comfort for all-day wear. Effortlessly seamless, they pair instantly with your Apple devices for a magical, intuitive listening experience.',32990,'accessory',77,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/AirPodsMax.webp'),
(18,'Galaxy Buds 3 Pro','Experience the pinnacle of audio innovation with the Samsung Galaxy Buds 3 Pro. These earbuds feature dual amplifiers and a planar tweeter, delivering rich, detailed sound across all frequencies. With Galaxy AI, they adapt in real-time to your environment, offering features like Adaptive ANC and Voice Detect for seamless transitions between immersive listening and ambient awareness. The sleek, angular design with intuitive pinch and swipe controls ensures both comfort and style, making them an essential companion for any audio enthusiast.',14990,'accessory',77,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/GalaxyBuds3Pro.avif'),
(19,'Galaxy Buds FE','Experience immersive sound with the Samsung Galaxy Buds FE. These wireless earbuds feature powerful Active Noise Cancellation (ANC) to block out distractions, ensuring a focused listening experience. Their ergonomic design, complemented by customizable ear tips and wingtips, guarantees a secure and comfortable fit for extended wear. With up to 30 hours of battery life using the charging case, you can enjoy uninterrupted music, calls, and more throughout your day.',5490,'accessory',88,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/GalaxyBudsFE.avif'),
(20,'Galaxy Watch 7','Samsung Galaxy Watch 7 is a cutting-edge smartwatch designed to seamlessly integrate into your lifestyle. Equipped with advanced health monitoring features, including FDA-authorized sleep apnea detection and real-time heart rhythm alerts, it empowers you to take control of your well-being. The vibrant AMOLED display, available in both 40mm and 44mm sizes, ensures clarity and style on your wrist. With its powerful Exynos W1000 processor and intuitive Wear OS 5 interface, the Galaxy Watch 7 delivers smooth performance and a personalized user experience.',16140,'accessory',58,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/GalaxyWatch7.avif'),
(21,'Galaxy Watch Ultra','The Samsung Galaxy Watch Ultra is a rugged, high-performance smartwatch built for adventurers and athletes who demand more from their gear. Crafted with a titanium Grade 4 frame and sapphire crystal glass, it’s engineered to withstand extreme conditions—from 100 meters underwater to 9,000 meters above sea level—while offering a brilliant 1.5-inch Super AMOLED display that shines even in direct sunlight . Its customizable Quick Button lets you launch workouts or safety features like an 85-decibel emergency siren instantly, and the multisport mode seamlessly tracks activities like triathlons with a single tap . With up to 100 hours of battery life in power-saving mode and AI-powered health insights—including sleep apnea detection and personalized energy scores—this watch is your ultimate fitness and wellness companion.',36891,'accessory',43,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/GalaxyWatchUltra.avif'),
(22,'Galaxy fit 3','The Galaxy Fit 3 is a sleek and lightweight fitness tracker designed to keep up with your active lifestyle. With a vibrant AMOLED display, it gives you real-time access to your health stats, notifications, and workouts—all at a glance. Whether you\'re tracking steps, sleep, heart rate, or stress, it delivers accurate insights to help you stay on top of your goals. Built for comfort and durability, it\'s the perfect companion for both everyday wear and intense training sessions.',3940,'accessory',24,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/GalaxyFit3.avif'),
(23,'Sony WH-CH720N','The Sony WH-CH720N headphones are your perfect blend of comfort, smart features, and immersive sound. With up to 35 hours of battery life and a lightweight design at just 192g, they\'re built for all-day listening without fatigue. Enjoy crisp, balanced audio enhanced by Sony’s DSEE technology, while the dual noise sensor and Integrated Processor V1 deliver effective noise cancellation to keep distractions at bay. Plus, with Bluetooth multipoint pairing, voice assistant support, and customizable EQ via the Sony Headphones app, these headphones adapt seamlessly to your lifestyle.',5950,'accessory',13,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/Sony-WH-CH720N.jpg'),
(24,'Sony Inzone H9','The Sony INZONE H9 Wireless Noise Cancelling Gaming Headset is engineered to elevate your gaming experience with its immersive 360 Spatial Sound, allowing you to detect opponents with pinpoint accuracy. Its dual noise sensor technology effectively blocks out distractions, while the ambient sound mode keeps you aware of important surroundings. Designed for comfort, it features soft headband cushions and synthetic leather ear pads, making it ideal for extended gaming sessions. With up to 32 hours of battery life and seamless compatibility with PlayStation 5 and Windows 10/11, the INZONE H9 ensures uninterrupted, high-quality gameplay.',12899,'accessory',16,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/SonyInzoneH9.jpg'),
(25,'Sony MDR-Z7M2','The Sony MDR-Z7M2 headphones are engineered for audiophiles seeking a luxurious and immersive listening experience. Featuring newly developed 70mm drivers with aluminum-coated Liquid Crystal Polymer diaphragms, they deliver a wide frequency response from 4Hz to 100kHz, ensuring every note is reproduced with stunning clarity and depth. The Fibonacci-patterned grill minimizes sound damping, allowing for smooth ultra-high-frequency reproduction, while the advanced magnetic circuit with a 200% larger neodymium magnet enhances power handling and response time. Ergonomically designed with plush low-repulsion foam ear pads and a durable aluminum-alloy frame, the MDR-Z7M2 offers exceptional comfort for extended listening sessions, making them an ideal choice for enjoying high-resolution audio in its purest form.',37999,'accessory',10,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/MDR-Z7M2.webp'),
(26,'Samsung Galaxy A56','The Samsung Galaxy A56 5G is a feature-packed smartphone that brings premium capabilities to the mid-range segment. It boasts a stunning 6.7-inch Super AMOLED display with a 120Hz refresh rate and peak brightness of 1,900 nits, ensuring vibrant visuals even under bright sunlight. Powered by the Exynos 1580 processor and equipped with up to 12GB of RAM, it delivers smooth performance for multitasking and gaming.',25990,'phone',34,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/GalaxyA56.avif'),
(27,'Samsung Galaxy A36','The Samsung Galaxy A36 5G is a sleek and powerful mid-range smartphone designed to elevate your mobile experience. It features a stunning 6.7-inch FHD+ Super AMOLED display with a 120Hz refresh rate and peak brightness of 1,200 nits, ensuring vibrant visuals even under bright sunlight. Powered by the Snapdragon 6 Gen 3 processor and equipped with up to 12GB of RAM, it delivers smooth performance for multitasking and gaming. The triple rear camera setup, featuring a 50MP main sensor, captures sharp and detailed photos, while the 12MP front camera is perfect for high-quality selfies. With a robust 5,000mAh battery supporting 45W fast charging, the Galaxy A36 5G keeps you connected throughout the day.',21990,'phone',29,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/GalaxyA36.avif'),
(28,'ASUS ROG Zephyrus G14','The ASUS ROG Zephyrus G14 (2024) is a compact powerhouse, featuring an AMD Ryzen 9 8945HS processor and up to an NVIDIA GeForce RTX 4070 GPU, delivering exceptional performance for gaming and creative tasks. Its 14-inch OLED display boasts a 3K resolution and 120Hz refresh rate, ensuring vibrant visuals and smooth gameplay. With 32GB of LPDDR5X RAM and a 1TB SSD, it offers ample memory and storage for multitasking and large files. The laptop\'s sleek design and portability make it an ideal choice for professionals and gamers on the go.',114900,'laptop',80,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/ZephyrusG14.png'),
(29,'ASUS ROG Zephyrus G16','The ASUS ROG Zephyrus G16 is a sleek and powerful 16-inch gaming laptop built for serious performance. It features up to an Intel Core Ultra 9 processor and an NVIDIA GeForce RTX 4090 GPU, making it ideal for both high-end gaming and demanding creative work. The stunning 16-inch OLED display offers a 240Hz refresh rate for ultra-smooth visuals. With advanced cooling, premium build quality, and AI-enhanced features, the G16 delivers top-tier power in a refined, portable design.',143900,'laptop',70,'https://cdn.jsdelivr.net/gh/Augustus1417/product_photos/ZephyrusG16.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(60) NOT NULL,
  `hashed_password` varchar(128) NOT NULL,
  `role` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'Admin','admin@gmail.com','$2b$12$jRO7Kqad3.E5G3sUhEYUxOFkpVLmPLtTmS7NF255ekH3ksSmH5Bz6','admin'),
(2,'Brent Faiyaz','brent@gmail.com','$2b$12$IqaIcvhi9YrH9L4qCcGfBO/Wg38kRwQpsA3SEHaSiUncDc6i3jObS','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'TechInTheBoxDB'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-05-30  2:50:46
