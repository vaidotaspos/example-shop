-- create customers table

CREATE TABLE `customers` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- create categories table


CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB;

-- add categories
INSERT INTO `categories` (`id`, `name`) VALUES
(NULL, 'Books'),
(NULL, 'Electronics'),
(NULL, 'Clothes'),
(NULL, 'Shoes'),
(NULL, 'Furniture');

-- create items table

CREATE TABLE `items` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` DECIMAL(12, 2) NOT NULL,
  `rating` DOUBLE(3, 2) NOT NULL,
  `stock` int(10) NOT NULL,
  `cat_id` int(10) UNSIGNED NOT NULL,
  `img_url` varchar(255) NOT NULL
) ENGINE=InnoDB;

-- add items

INSERT INTO `items` (`id`, `title`, `description`, `price`, `rating`, `stock`, `cat_id`, `img_url`) VALUES
(NULL, 'Book about HTML', 'Very important programing language. ', '10.99', '3.5', '50', '1', 'https://picsum.photos/id/2/800/600'),
(NULL, 'Book about CSS', 'Very important programing language. ', '10.99', '3.5', '50', '1', 'https://picsum.photos/id/3/800/600'),
(NULL, 'Book about JS', 'Very important programing language. ', '10.99', '3.5', '50', '1', 'https://picsum.photos/id/4/800/600'),
(NULL, 'Book about PHP', 'Php is great language  ', '10.99', '3.5', '50', '1', 'https://picsum.photos/id/5/800/600'),
(NULL, 'Book about SQL', 'Very important programing language. ', '10.99', '3.5', '50', '1', 'https://picsum.photos/id/6/800/600'),
(NULL, 'Book about Python', 'Very important programing language. ', '10.99', '3.5', '50', '1', 'https://picsum.photos/id/7/800/600'),

-- add item 

INSERT INTO `items` (`id`, `title`, `description`, `price`, `rating`, `stock`, `cat_id`, `img_url`) VALUES 
(NULL, 'Book about HTML', 'Very important programing language. ', '10.99', '3.5', '50', '1', 'https://picsum.photos/id/2/800/600');

-- const orders = {
--   id: 1,
--   item_id: 1,
--   customer_id: 1,
--   qty: 1,
--   total: 500,
-- };

-- create orders table
CREATE TABLE `orders` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `item_id` int(10) UNSIGNED NOT NULL,
  `customer_id` int(10) UNSIGNED NOT NULL,
  `qty` int(10) UNSIGNED NOT NULL,
  `total` DECIMAL(12, 2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB;

-- add orders
INSERT INTO `orders` (`id`, `item_id`, `customer_id`, `qty`, `total`) VALUES
(NULL, '1', '1', '1', '500.00');

-- select orders by customer id, join items table to get item details
SELECT orders.id, orders.qty, orders.total, items.title, items.img_url, customers.email AS buyerEmail FROM orders JOIN items ON orders.item_id = items.id JOIN `customers` ON customers.id=orders.customer_id WHERE orders.customer_id = 2;

