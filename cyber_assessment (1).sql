-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 15, 2025 at 09:56 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cyber_assessment`
--

-- --------------------------------------------------------

--
-- Table structure for table `assessments`
--

CREATE TABLE `assessments` (
  `id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `details` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `assessments`
--

INSERT INTO `assessments` (`id`, `score`, `details`, `created_at`) VALUES
(1, 85, '{\"1\":\"Yes\",\"2\":\"Mostly\",\"3\":\"Yes\",\"4\":\"Sometimes\",\"5\":\"Yes\",\"6\":\"Mostly\",\"7\":\"Yes\",\"8\":\"Sometimes\",\"9\":\"Yes\",\"10\":\"Yes\",\"11\":\"Yes\",\"12\":\"Yes\",\"13\":\"Sometimes\",\"14\":\"Yes\",\"15\":\"Yes\",\"16\":\"Yes\",\"17\":\"Sometimes\",\"18\":\"Yes\",\"19\":\"Yes\",\"20\":\"Mostly\",\"21\":\"Yes\",\"22\":\"Yes\",\"23\":\"Yes\",\"24\":\"Mostly\",\"25\":\"Yes\",\"26\":\"Mostly\",\"27\":\"Yes\",\"28\":\"Yes\",\"29\":\"Yes\",\"30\":\"Mostly\",\"31\":\"Yes\",\"32\":\"Yes\",\"33\":\"Mostly\",\"34\":\"Yes\",\"35\":\"Mostly\",\"36\":\"Yes\",\"37\":\"Mostly\",\"38\":\"Yes\",\"39\":\"Mostly\",\"40\":\"Yes\"}', '2025-11-25 06:17:29'),
(2, 88, '{\"1\":\"Yes\",\"2\":\"Mostly\",\"3\":\"Yes\",\"4\":\"Yes\",\"5\":\"Yes\",\"6\":\"Mostly\",\"7\":\"Yes\",\"8\":\"Yes\",\"9\":\"Sometimes\",\"10\":\"Yes\",\"11\":\"Yes\",\"12\":\"Yes\",\"13\":\"Mostly\",\"14\":\"Yes\",\"15\":\"Yes\",\"16\":\"Yes\",\"17\":\"Mostly\",\"18\":\"Yes\",\"19\":\"Yes\",\"20\":\"Sometimes\",\"21\":\"Yes\",\"22\":\"Mostly\",\"23\":\"Yes\",\"24\":\"Mostly\",\"25\":\"Yes\",\"26\":\"Mostly\",\"27\":\"Yes\",\"28\":\"Mostly\",\"29\":\"Yes\",\"30\":\"Mostly\",\"31\":\"Yes\",\"32\":\"Yes\",\"33\":\"Yes\",\"34\":\"Yes\",\"35\":\"Sometimes\",\"36\":\"Yes\",\"37\":\"Yes\",\"38\":\"Yes\",\"39\":\"Yes\",\"40\":\"Yes\"}', '2025-11-25 11:25:50'),
(3, 90, '{\"1\":\"Yes\",\"2\":\"Mostly\",\"3\":\"Yes\",\"4\":\"Yes\",\"5\":\"Yes\",\"6\":\"Yes\",\"7\":\"Yes\",\"8\":\"Mostly\",\"9\":\"Yes\",\"10\":\"Mostly\",\"11\":\"Yes\",\"12\":\"Mostly\",\"13\":\"Yes\",\"14\":\"Yes\",\"15\":\"Yes\",\"16\":\"Mostly\",\"17\":\"Yes\",\"18\":\"Yes\",\"19\":\"Yes\",\"20\":\"Mostly\",\"21\":\"Yes\",\"22\":\"Sometimes\",\"23\":\"Yes\",\"24\":\"Yes\",\"25\":\"Mostly\",\"26\":\"Yes\",\"27\":\"Yes\",\"28\":\"Yes\",\"29\":\"Yes\",\"30\":\"Mostly\",\"31\":\"Yes\",\"32\":\"Yes\",\"33\":\"Yes\",\"34\":\"Mostly\",\"35\":\"Yes\",\"36\":\"Yes\",\"37\":\"Yes\",\"38\":\"Mostly\",\"39\":\"Yes\",\"40\":\"Yes\"}', '2025-11-25 11:29:53'),
(4, 83, '{\"1\":\"Yes\",\"2\":\"Mostly\",\"3\":\"Yes\",\"4\":\"Sometimes\",\"5\":\"Yes\",\"6\":\"Mostly\",\"7\":\"Yes\",\"8\":\"Mostly\",\"9\":\"Yes\",\"10\":\"Sometimes\",\"11\":\"Yes\",\"12\":\"Yes\",\"13\":\"Yes\",\"14\":\"Yes\",\"15\":\"Mostly\",\"16\":\"Yes\",\"17\":\"Sometimes\",\"18\":\"Yes\",\"19\":\"Mostly\",\"20\":\"Yes\",\"21\":\"Mostly\",\"22\":\"Yes\",\"23\":\"Yes\",\"24\":\"Yes\",\"25\":\"Mostly\",\"26\":\"Yes\",\"27\":\"Sometimes\",\"28\":\"Yes\",\"29\":\"Yes\",\"30\":\"Yes\",\"31\":\"Mostly\",\"32\":\"Yes\",\"33\":\"Mostly\",\"34\":\"Yes\",\"35\":\"Yes\",\"36\":\"Yes\",\"37\":\"Sometimes\",\"38\":\"Yes\",\"39\":\"Yes\",\"40\":\"Mostly\"}', '2025-11-25 12:08:43'),
(5, 92, '{\"1\":\"Yes\",\"2\":\"Mostly\",\"3\":\"Yes\",\"4\":\"Mostly\",\"5\":\"Yes\",\"6\":\"Mostly\",\"7\":\"Yes\",\"8\":\"Yes\",\"9\":\"Yes\",\"10\":\"Yes\",\"11\":\"Yes\",\"12\":\"Yes\",\"13\":\"Yes\",\"14\":\"Yes\",\"15\":\"Mostly\",\"16\":\"Yes\",\"17\":\"Yes\",\"18\":\"Mostly\",\"19\":\"Yes\",\"20\":\"Yes\",\"21\":\"Yes\",\"22\":\"Yes\",\"23\":\"Yes\",\"24\":\"Yes\",\"25\":\"Yes\",\"26\":\"Mostly\",\"27\":\"Yes\",\"28\":\"Yes\",\"29\":\"Mostly\",\"30\":\"Yes\",\"31\":\"Mostly\",\"32\":\"Mostly\",\"33\":\"Yes\",\"34\":\"Yes\",\"35\":\"Yes\",\"36\":\"Yes\",\"37\":\"Mostly\",\"38\":\"Yes\",\"39\":\"Yes\",\"40\":\"Yes\"}', '2025-11-25 12:24:22'),
(6, 89, '{\"1\":\"Yes\",\"2\":\"Mostly\",\"3\":\"Yes\",\"4\":\"Yes\",\"5\":\"Yes\",\"6\":\"Mostly\",\"7\":\"Yes\",\"8\":\"Mostly\",\"9\":\"Yes\",\"10\":\"Mostly\",\"11\":\"Yes\",\"12\":\"Yes\",\"13\":\"Yes\",\"14\":\"Mostly\",\"15\":\"Yes\",\"16\":\"Yes\",\"17\":\"Mostly\",\"18\":\"Yes\",\"19\":\"Yes\",\"20\":\"Yes\",\"21\":\"Yes\",\"22\":\"Mostly\",\"23\":\"Yes\",\"24\":\"Mostly\",\"25\":\"Yes\",\"26\":\"Yes\",\"27\":\"Yes\",\"28\":\"Yes\",\"29\":\"Mostly\",\"30\":\"Yes\",\"31\":\"Mostly\",\"32\":\"Yes\",\"33\":\"Yes\",\"34\":\"Yes\",\"35\":\"Mostly\",\"36\":\"Yes\",\"37\":\"Yes\",\"38\":\"Mostly\",\"39\":\"Yes\",\"40\":\"Mostly\"}', '2025-11-25 12:32:08'),
(7, 93, '{\"1\":\"Yes\",\"2\":\"Mostly\",\"3\":\"Yes\",\"4\":\"Yes\",\"5\":\"Yes\",\"6\":\"Yes\",\"7\":\"Yes\",\"8\":\"Yes\",\"9\":\"Yes\",\"10\":\"Mostly\",\"11\":\"Yes\",\"12\":\"Yes\",\"13\":\"Yes\",\"14\":\"Yes\",\"15\":\"Yes\",\"16\":\"Yes\",\"17\":\"Yes\",\"18\":\"Mostly\",\"19\":\"Yes\",\"20\":\"Yes\",\"21\":\"Mostly\",\"22\":\"Yes\",\"23\":\"Yes\",\"24\":\"Yes\",\"25\":\"Yes\",\"26\":\"Yes\",\"27\":\"Mostly\",\"28\":\"Yes\",\"29\":\"Yes\",\"30\":\"Yes\",\"31\":\"Yes\",\"32\":\"Yes\",\"33\":\"Yes\",\"34\":\"Yes\",\"35\":\"Mostly\",\"36\":\"Yes\",\"37\":\"Mostly\",\"38\":\"Yes\",\"39\":\"Yes\",\"40\":\"Mostly\"}', '2025-11-26 05:25:09');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `title`) VALUES
(1, 'Basic Security'),
(2, 'Foundational Security'),
(3, 'Organizational Security');

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `option_key` varchar(50) NOT NULL,
  `option_text` text NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`id`, `question_id`, `option_key`, `option_text`, `score`) VALUES
(1, 1, 'A', 'Yup, it shows everything automatically', 3),
(2, 1, 'B', 'Yeah, but we check manually', 2),
(3, 1, 'C', 'Kind of, only sometimes', 1),
(4, 1, 'D', 'Nope / No clue', 0),
(5, 2, 'A', 'Fully locked down', 3),
(6, 2, 'B', 'Mostly controlled', 2),
(7, 2, 'C', 'A little bit', 1),
(8, 2, 'D', 'Nope / No idea', 0),
(9, 3, 'A', 'Yes, completely automated', 3),
(10, 3, 'B', 'Yes, but we check by hand', 2),
(11, 3, 'C', 'Sort of', 1),
(12, 3, 'D', 'No / Don’t know', 0),
(13, 4, 'A', 'Yes, all apps are controlled', 3),
(14, 4, 'B', 'Yes, for important apps', 2),
(15, 4, 'C', 'Kind of', 1),
(16, 4, 'D', 'Nope', 0),
(17, 5, 'A', 'Yes, runs automatically', 3),
(18, 5, 'B', 'Yes, but manually', 2),
(19, 5, 'C', 'A little bit', 1),
(20, 5, 'D', 'No idea', 0),
(21, 6, 'A', 'Always updated', 3),
(22, 6, 'B', 'Mostly updated', 2),
(23, 6, 'C', 'Sometimes updated', 1),
(24, 6, 'D', 'No idea', 0),
(25, 7, 'A', 'Yes, tracked clearly', 3),
(26, 7, 'B', 'Mostly', 2),
(27, 7, 'C', 'Kind of', 1),
(28, 7, 'D', 'Nope', 0),
(29, 8, 'A', 'Strict rules', 3),
(30, 8, 'B', 'Some rules', 2),
(31, 8, 'C', 'Rarely', 1),
(32, 8, 'D', 'No rules', 0),
(33, 9, 'A', 'Yes, automatically', 3),
(34, 9, 'B', 'Yes, manually', 2),
(35, 9, 'C', 'Sometimes', 1),
(36, 9, 'D', 'Nope', 0),
(37, 10, 'A', 'Yes, enforced', 3),
(38, 10, 'B', 'Yes, partly', 2),
(39, 10, 'C', 'Sort of', 1),
(40, 10, 'D', 'No', 0),
(41, 11, 'A', 'Fully automated', 3),
(42, 11, 'B', 'We try', 2),
(43, 11, 'C', 'Sometimes', 1),
(44, 11, 'D', 'No', 0),
(45, 12, 'A', 'Yup', 3),
(46, 12, 'B', 'Mostly', 2),
(47, 12, 'C', 'Kinda', 1),
(48, 12, 'D', 'Nope', 0),
(49, 13, 'A', 'Yes, fully controlled', 3),
(50, 13, 'B', 'Yes, for the most part', 2),
(51, 13, 'C', 'Sometimes', 1),
(52, 13, 'D', 'No', 0),
(53, 14, 'A', 'Yes, automatically', 3),
(54, 14, 'B', 'Sometimes', 2),
(55, 14, 'C', 'Rarely', 1),
(56, 14, 'D', 'Never', 0),
(57, 15, 'A', 'Yes, everywhere', 3),
(58, 15, 'B', 'On most systems', 2),
(59, 15, 'C', 'Only some systems', 1),
(60, 15, 'D', 'Nope', 0),
(61, 16, 'A', 'Always', 3),
(62, 16, 'B', 'Usually', 2),
(63, 16, 'C', 'Sometimes', 1),
(64, 16, 'D', 'No', 0),
(65, 17, 'A', 'Yes, fully', 3),
(66, 17, 'B', 'Mostly', 2),
(67, 17, 'C', 'A little', 1),
(68, 17, 'D', 'No', 0),
(69, 18, 'A', 'Yes', 3),
(70, 18, 'B', 'Sometimes', 2),
(71, 18, 'C', 'Rarely', 1),
(72, 18, 'D', 'No', 0),
(73, 19, 'A', 'Always', 3),
(74, 19, 'B', 'Often', 2),
(75, 19, 'C', 'Sometimes', 1),
(76, 19, 'D', 'Never', 0),
(77, 20, 'A', 'Yes, encrypted', 3),
(78, 20, 'B', 'Mostly', 2),
(79, 20, 'C', 'Not sure', 1),
(80, 20, 'D', 'No', 0),
(81, 21, 'A', 'Yes everywhere', 3),
(82, 21, 'B', 'On some devices', 2),
(83, 21, 'C', 'Rarely', 1),
(84, 21, 'D', 'No idea', 0),
(85, 22, 'A', 'Yes', 3),
(86, 22, 'B', 'Occasionally', 2),
(87, 22, 'C', 'Rarely', 1),
(88, 22, 'D', 'No', 0),
(89, 23, 'A', 'Yes', 3),
(90, 23, 'B', 'Mostly', 2),
(91, 23, 'C', 'Somewhat', 1),
(92, 23, 'D', 'No', 0),
(93, 24, 'A', 'Yes', 3),
(94, 24, 'B', 'Mostly', 2),
(95, 24, 'C', 'Sometimes', 1),
(96, 24, 'D', 'Nope', 0),
(97, 25, 'A', 'Yes', 3),
(98, 25, 'B', 'Mostly', 2),
(99, 25, 'C', 'A bit', 1),
(100, 25, 'D', 'No', 0),
(101, 26, 'A', 'Fully', 3),
(102, 26, 'B', 'Mostly', 2),
(103, 26, 'C', 'Partly', 1),
(104, 26, 'D', 'Not at all', 0),
(105, 27, 'A', 'Always', 3),
(106, 27, 'B', 'Mostly', 2),
(107, 27, 'C', 'Sometimes', 1),
(108, 27, 'D', 'No', 0),
(109, 28, 'A', 'Yes', 3),
(110, 28, 'B', 'Mostly', 2),
(111, 28, 'C', 'Rarely', 1),
(112, 28, 'D', 'No', 0),
(113, 29, 'A', 'Yes', 3),
(114, 29, 'B', 'Mostly', 2),
(115, 29, 'C', 'Sometimes', 1),
(116, 29, 'D', 'No', 0),
(117, 30, 'A', 'Yes', 3),
(118, 30, 'B', 'Somewhat', 2),
(119, 30, 'C', 'Rarely', 1),
(120, 30, 'D', 'No idea', 0),
(121, 31, 'A', 'Yes', 3),
(122, 31, 'B', 'Mostly', 2),
(123, 31, 'C', 'A bit', 1),
(124, 31, 'D', 'Not at all', 0),
(125, 32, 'A', 'Yes everywhere', 3),
(126, 32, 'B', 'On some accounts', 2),
(127, 32, 'C', 'Rarely', 1),
(128, 32, 'D', 'No', 0),
(129, 33, 'A', 'Regularly trained', 3),
(130, 33, 'B', 'Sometimes', 2),
(131, 33, 'C', 'Rarely', 1),
(132, 33, 'D', 'Never', 0),
(133, 34, 'A', 'Yes', 3),
(134, 34, 'B', 'Sometimes', 2),
(135, 34, 'C', 'Rarely', 1),
(136, 34, 'D', 'No', 0),
(137, 35, 'A', 'Always', 3),
(138, 35, 'B', 'Mostly', 2),
(139, 35, 'C', 'Sometimes', 1),
(140, 35, 'D', 'No idea', 0),
(141, 36, 'A', 'Yes', 3),
(142, 36, 'B', 'Sometimes', 2),
(143, 36, 'C', 'Rarely', 1),
(144, 36, 'D', 'No', 0),
(145, 37, 'A', 'Clear plan', 3),
(146, 37, 'B', 'Rough plan', 2),
(147, 37, 'C', 'A little', 1),
(148, 37, 'D', 'No plan', 0),
(149, 38, 'A', 'Yes', 3),
(150, 38, 'B', 'Sometimes', 2),
(151, 38, 'C', 'Rarely', 1),
(152, 38, 'D', 'No', 0),
(153, 39, 'A', 'Yes', 3),
(154, 39, 'B', 'Sometimes', 2),
(155, 39, 'C', 'Rarely', 1),
(156, 39, 'D', 'Never', 0),
(157, 40, 'A', 'Yes', 3),
(158, 40, 'B', 'Often', 2),
(159, 40, 'C', 'Sometimes', 1),
(160, 40, 'D', 'No', 0);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `question_text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `category_id`, `question_text`) VALUES
(1, 1, 'Do you have a tool that shows all the devices connected to your WiFi or network?'),
(2, 1, 'Do you control who can join your network so random devices can’t sneak in?'),
(3, 1, 'Do you use anything that tells you what software/apps are installed on your systems?'),
(4, 1, 'Do you guide employees on which apps are allowed or not?'),
(5, 1, 'Do you have a tool that scans for weaknesses or security issues?'),
(6, 1, 'Are your computers automatically updated with security patches?'),
(7, 1, 'Do you know exactly who has “admin access”?'),
(8, 1, 'Do you follow clear rules about who gets admin access?'),
(9, 1, 'Do you check your systems for wrong settings or unsafe configurations?'),
(10, 1, 'Do you enforce basic security rules like strong passwords?'),
(11, 1, 'Do you use tools that monitor logs for weird or suspicious activity?'),
(12, 1, 'Do all your logs get collected in one place so they’re easy to review?'),
(13, 2, 'Do you limit which browsers or email apps people can use?'),
(14, 2, 'Do you scan email attachments before opening them?'),
(15, 2, 'Do you use anti-malware or antivirus tools?'),
(16, 2, 'Do malware alerts go to a central team or system?'),
(17, 2, 'Do you know which network ports/services are active by default?'),
(18, 2, 'Do you get alerts if weird/unknown ports open up?'),
(19, 2, 'Do you automatically back up your data?'),
(20, 2, 'Is your backup data protected while moving or being stored?'),
(21, 2, 'Do you use MFA to log in to routers, firewalls, or network devices?'),
(22, 2, 'Do you check for unexpected changes in your network settings?'),
(23, 2, 'Do you know all the connections your network has to the internet?'),
(24, 2, 'Can you block suspicious traffic if needed?'),
(25, 2, 'Do you know what counts as “sensitive data” in your company?'),
(26, 2, 'Do you monitor sensitive data to ensure it’s safe?'),
(27, 2, 'Do people only access the information they truly need for their job?'),
(28, 2, 'Do you store each team’s data separately (HR separate from Finance etc.)?'),
(29, 2, 'Do you have a separate guest WiFi?'),
(30, 2, 'Do you track all approved WiFi access points?'),
(31, 2, 'Do most logins go through a single system (like Google Workspace/Okta)?'),
(32, 2, 'Do you use MFA for important accounts?'),
(33, 3, 'Do you train employees about security basics?'),
(34, 3, 'Do you train employees to spot scams or phishing emails?'),
(35, 3, 'Do developers follow safe coding practices?'),
(36, 3, 'Do you test your software for security issues?'),
(37, 3, 'Do you have a plan for what to do if there’s a cyber incident?'),
(38, 3, 'Do you practice your incident response plan?'),
(39, 3, 'Do you do ethical hacking or penetration tests to find weaknesses?'),
(40, 3, 'Do you use tools to scan your systems for vulnerabilities?');

-- --------------------------------------------------------

--
-- Table structure for table `responses`
--

CREATE TABLE `responses` (
  `id` int(11) NOT NULL,
  `user_id` varchar(100) DEFAULT NULL,
  `question_id` int(11) NOT NULL,
  `option_key` varchar(50) NOT NULL,
  `score` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `scans`
--

CREATE TABLE `scans` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` enum('active','completed') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assessments`
--
ALTER TABLE `assessments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `responses`
--
ALTER TABLE `responses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `scans`
--
ALTER TABLE `scans`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assessments`
--
ALTER TABLE `assessments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;

--
-- AUTO_INCREMENT for table `responses`
--
ALTER TABLE `responses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `scans`
--
ALTER TABLE `scans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `options_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `responses`
--
ALTER TABLE `responses`
  ADD CONSTRAINT `responses_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
