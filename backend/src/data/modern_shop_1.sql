-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 22, 2024 at 12:46 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `modern_shop_1`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Books'),
(2, 'Electronics'),
(3, 'Clothes'),
(4, 'Shoes'),
(5, 'Furniture');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `email`, `password`, `created_at`) VALUES
(2, 'james@bond.com', '$2a$10$TwrmttEbu1TYEO412IYuYeGqZ4QNCppxduEeSraizdLFBSvnUzQfO', '2024-01-17 12:56:49'),
(3, 'serbentautas@bordiuras.com', '$2a$10$IQydtaPxfupgCXuGeZrriutea9dNRnhYdZsSuRP2EpgDefUM4A1Km', '2024-01-17 12:57:22'),
(4, 'jane@dow.com', '$2a$10$ZjIWEMuxrrrtXEAHyapoLeFyTPORRm76s5Uy9/Nu.kK/lApUhiH.m', '2024-01-17 12:57:32'),
(6, 'jane@dow1.com', '$2a$10$xpFRp8y0txKIjaNpXZm1TOcvzfzZ5sOtJJ2hMCYr.21SeLwrfT5ea', '2024-01-17 13:00:20'),
(7, 'jane@dowiene.com', '$2a$10$6nLJGxx0rpnGe58Ghtqlzu36gv6qrDfGi4XHul7Hnhu6K4ZRuJnEC', '2024-01-17 13:02:26'),
(12, 'mike@bond.com', '$2a$10$wfyV9AFatBWdFt5g6sVfDubn9AE4aGQM9DO0yy.OP7d0Vt4PF9G9.', '2024-01-17 13:13:51');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `rating` double(3,2) NOT NULL,
  `stock` int(10) NOT NULL,
  `cat_id` int(10) UNSIGNED NOT NULL,
  `img_url` varchar(255) NOT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `title`, `description`, `price`, `rating`, `stock`, `cat_id`, `img_url`, `isDeleted`) VALUES
(1, 'Book about HTML', 'Very important programing language. ', 10.99, 3.50, 50, 1, 'https://picsum.photos/id/2/800/600', 0),
(2, 'Course in Magic', 'All you need to know about Magic', 99.99, 4.98, 30, 2, 'https://picsum.photos/id/11/800/600', 1),
(3, 'Course in Magic', 'All you need to know about Magic', 99.99, 4.98, 30, 2, 'https://picsum.photos/id/11/800/600', 1),
(4, 'Train to Madagascar', 'Penguins and safari stuff', 2999.99, 4.05, 3, 3, 'https://picsum.photos/id/12/800/600', 0),
(5, 'Book about HTML', 'Very important programing language. ', 10.99, 3.50, 50, 2, 'https://picsum.photos/id/2/800/600', 0),
(6, 'Book about CSS', 'Very important programing language. ', 10.99, 3.50, 50, 5, 'https://picsum.photos/id/3/800/600', 0),
(7, 'Book about JS', 'Very important programing language. ', 10.99, 3.50, 50, 3, 'https://picsum.photos/id/4/800/600', 0),
(8, 'Book about PHP', 'Php is great language  ', 10.99, 3.50, 50, 1, 'https://picsum.photos/id/5/800/600', 0),
(9, 'Book about SQL', 'Very important programing language. ', 10.99, 3.50, 50, 4, 'https://picsum.photos/id/6/800/600', 0),
(10, 'Book about Python', 'Very important programing language. ', 10.99, 3.50, 50, 5, 'https://picsum.photos/id/7/800/600', 0);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(10) UNSIGNED NOT NULL,
  `item_id` int(10) UNSIGNED NOT NULL,
  `customer_id` int(10) UNSIGNED NOT NULL,
  `qty` int(10) UNSIGNED NOT NULL,
  `total` decimal(12,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `item_id`, `customer_id`, `qty`, `total`, `created_at`) VALUES
(1, 1, 1, 1, 500.00, '2024-01-21 21:12:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
