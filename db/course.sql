-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 17 2023 г., 01:59
-- Версия сервера: 8.0.29
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `course`
--

-- --------------------------------------------------------

--
-- Структура таблицы `administrator`
--

CREATE TABLE `administrator` (
  `ID` int NOT NULL,
  `PIB` varchar(100) NOT NULL,
  `PhoneNumber` varchar(12) NOT NULL,
  `UserId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `administrator`
--

INSERT INTO `administrator` (`ID`, `PIB`, `PhoneNumber`, `UserId`) VALUES
(7, '1241243232312332', '3243243242', 38),
(10, '2342', '234234234', 70),
(11, '324', '9515324234', 72),
(12, '213123', '1234567890', 82),
(13, 'qw', '1234567890', 86),
(14, 'qq', '1234567890', 87),
(15, '1231231', '1234567890', 101),
(16, 'Вуличний Олександир Борисович', '1234567890', 106);

-- --------------------------------------------------------

--
-- Структура таблицы `contractor`
--

CREATE TABLE `contractor` (
  `ID` int NOT NULL,
  `PIB` varchar(100) NOT NULL,
  `PhoneNumber` varchar(12) NOT NULL,
  `ConfirmationRegistrationAdministrator` tinyint(1) DEFAULT NULL,
  `AdministratorConfirmedRegistration_ID` int DEFAULT NULL,
  `ConfirmationDateRegistration` datetime DEFAULT NULL,
  `UserId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `contractor`
--

INSERT INTO `contractor` (`ID`, `PIB`, `PhoneNumber`, `ConfirmationRegistrationAdministrator`, `AdministratorConfirmedRegistration_ID`, `ConfirmationDateRegistration`, `UserId`) VALUES
(16, 'r', '3809999991', 1, 7, '2022-10-22 13:00:09', 98),
(17, 'qwe', '3809999991', 1, 7, '2022-10-22 18:44:44', 100),
(19, 'Дворовий Денис Іванович', '3809999991', 1, 16, '2022-10-22 19:16:00', 105);

-- --------------------------------------------------------

--
-- Структура таблицы `customer`
--

CREATE TABLE `customer` (
  `ID` int NOT NULL,
  `PIB` varchar(100) NOT NULL,
  `PhoneNumber` varchar(12) NOT NULL,
  `Region` varchar(50) NOT NULL,
  `City` varchar(50) NOT NULL,
  `UserId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `customer`
--

INSERT INTO `customer` (`ID`, `PIB`, `PhoneNumber`, `Region`, `City`, `UserId`) VALUES
(29, 'q', '2311231321', 'q', 'q', 91),
(31, 'q', '3809999991', 'q', 'q', 95),
(33, 'wqe', '3809999991', 'qwe', 'qwe', 99),
(34, 'Іваненко Максим Дмитрович', '3809999991', 'Полтва', 'Полтава', 102),
(35, 'Іванеко Дмитро Борисович', '3809999991', 'qwer', 'qwer', 104);

-- --------------------------------------------------------

--
-- Структура таблицы `listconstructionworks`
--

CREATE TABLE `listconstructionworks` (
  `ID` int NOT NULL,
  `Project_ID` int NOT NULL,
  `ManagingAdministrator_ID` int DEFAULT NULL,
  `DateCreation` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `listconstructionworks`
--

INSERT INTO `listconstructionworks` (`ID`, `Project_ID`, `ManagingAdministrator_ID`, `DateCreation`) VALUES
(73, 75, NULL, '2022-10-22 12:54:44'),
(75, 77, NULL, '2022-10-22 18:40:42'),
(76, 78, NULL, '2022-10-22 19:12:37');

-- --------------------------------------------------------

--
-- Структура таблицы `offeredcontractors`
--

CREATE TABLE `offeredcontractors` (
  `ID` int NOT NULL,
  `Project_ID` int NOT NULL,
  `Contractor_ID` int NOT NULL,
  `ContractorSuggestedPrice` int NOT NULL,
  `Administrator_ID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `project`
--

CREATE TABLE `project` (
  `ID` int NOT NULL,
  `Customer_ID` int DEFAULT NULL,
  `ApprovedContractor_ID` int DEFAULT NULL,
  `CommonApproximateConstructionEstimate` int NOT NULL,
  `Status` int NOT NULL,
  `Administrator_ID` int DEFAULT NULL,
  `ProjectClosingDate` datetime DEFAULT NULL,
  `FullBuldingAdress` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `project`
--

INSERT INTO `project` (`ID`, `Customer_ID`, `ApprovedContractor_ID`, `CommonApproximateConstructionEstimate`, `Status`, `Administrator_ID`, `ProjectClosingDate`, `FullBuldingAdress`) VALUES
(73, 29, NULL, 324234, 2, NULL, NULL, 'efwr234'),
(75, 31, NULL, 423, 5, NULL, NULL, '234dfs'),
(77, 33, 17, 2321, 5, NULL, NULL, 'вул.Грушевького 12'),
(78, 35, 19, 10000, 5, 16, NULL, 'вул.Пряма 12');

-- --------------------------------------------------------

--
-- Структура таблицы `setting`
--

CREATE TABLE `setting` (
  `siteName` varchar(50) NOT NULL,
  `about` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `language` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `setting`
--

INSERT INTO `setting` (`siteName`, `about`, `language`) VALUES
('32423', '<p>About textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout text</p>', 'ua'),
('Name Site', '<p>About textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout textAbout text</p>', 'en');

-- --------------------------------------------------------

--
-- Структура таблицы `typeconstructionworks`
--

CREATE TABLE `typeconstructionworks` (
  `ID` int NOT NULL,
  `TypeWork` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ScopeWork` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ApproximateConstructionEstimate` int NOT NULL,
  `PlaceConstructionWorks` varchar(200) NOT NULL,
  `listConstructionWorks_ID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `typeconstructionworks`
--

INSERT INTO `typeconstructionworks` (`ID`, `TypeWork`, `ScopeWork`, `ApproximateConstructionEstimate`, `PlaceConstructionWorks`, `listConstructionWorks_ID`) VALUES
(81, '234234', '23423', 324234234, '234234fds', 73),
(83, 'Покласти плитку', '10 м^2', 234234, 'прихожа', 75),
(84, 'Покласти', '10 м^2', 10000, 'кухня в домі', 76);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `Id` int NOT NULL,
  `Login` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Role` varchar(100) NOT NULL,
  `Email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`Id`, `Login`, `Password`, `Role`, `Email`) VALUES
(38, 'user4', '$2a$07$y48UGJ5sNUF1.lKj7OHrh.z5lNt5iJACWVUrUYpqgralrLgroXYDu', 'admin', 'emai4l@email.com'),
(80, '423423', '$2a$07$/.h5V9p6VXhU0U3OxS1T3uXjkqvP5ZIrCKLoQh4y/ICuEuC7pbmjy', 'admin', '23432'),
(81, '4442344', '$2a$07$ypEwN482a6qa2NdA6C7iouHpFoWxNbPsYZH.H1Wju9jkSAHfvpe..', 'admin', '2344444'),
(82, 'user10', '$2a$07$P/2yME7jvxhnNeZz0qFuDeKp9wLs3R41FiCuvgNOsFyX55zj.sxEu', 'admin', '231@fdsf.cof'),
(95, 'q', '$2a$07$JN2AEjl.W3sz3RRtagNmduz9Ad5bDaOyqDNtGpdTMC5QArY3eP44.', 'customer', 'adqmin@admin.com'),
(98, 'r', '$2a$07$z1BUmGXnS2cJxpSlSCWTXeWFv4SpG3Mn3IvtQ/uYwxnE3u98q43vm', 'contractor', 'admrin@admin.com'),
(99, 'qwe', '$2a$07$tU2u6gTnRvOULEcxZ8x3Huq7pBSotTkTbtDJbhR0vldbGwuEISnDG', 'customer', 'qwe@qwe.com'),
(100, 'qwee', '$2a$07$ShzB701f4mvUii3g6fEa6uoCj5vG7uoluWr.RPj162LJqrZw92V8i', 'contractor', 'qweerty1@qwerty1.com'),
(102, 'qwerty', '$2a$07$ZsGiSDFh9nfENX2B.gnSKOzxj8odkCHfQKlVtnVD/L3LHa/Pm/TKa', 'customer', '324234@fsd.cd'),
(104, 'qwer', '$2a$07$Qzy.3LVDBx1IiaaKFgybd.7YXJEduHS83UK2o2qxU5d41PY2WDCt2', 'customer', 'qwerty2@qwerty2.com'),
(105, 'www', '$2a$07$kF5xDIwymO1ZShMU/2evn.P7IRIPEOsmgeM2C/y2ZtkluF88Ka14G', 'contractor', 'qwwwerty2@qwerty2.com');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `administrator`
--
ALTER TABLE `administrator`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `contractor`
--
ALTER TABLE `contractor`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `AdministratorConfirmedRegistration_ID` (`AdministratorConfirmedRegistration_ID`);

--
-- Индексы таблицы `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `listconstructionworks`
--
ALTER TABLE `listconstructionworks`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Project_ID` (`Project_ID`),
  ADD KEY `ManagingAdministrator_ID` (`ManagingAdministrator_ID`);

--
-- Индексы таблицы `offeredcontractors`
--
ALTER TABLE `offeredcontractors`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Contractor_ID` (`Contractor_ID`),
  ADD KEY `Administrator_ID` (`Administrator_ID`),
  ADD KEY `Project_ID` (`Project_ID`);

--
-- Индексы таблицы `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ApprovedContractor_ID` (`ApprovedContractor_ID`),
  ADD KEY `Customer_ID` (`Customer_ID`),
  ADD KEY `Administrator_ID` (`Administrator_ID`);

--
-- Индексы таблицы `typeconstructionworks`
--
ALTER TABLE `typeconstructionworks`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `listconstructionworks` (`listConstructionWorks_ID`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `administrator`
--
ALTER TABLE `administrator`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `contractor`
--
ALTER TABLE `contractor`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT для таблицы `customer`
--
ALTER TABLE `customer`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT для таблицы `listconstructionworks`
--
ALTER TABLE `listconstructionworks`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT для таблицы `offeredcontractors`
--
ALTER TABLE `offeredcontractors`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT для таблицы `project`
--
ALTER TABLE `project`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT для таблицы `typeconstructionworks`
--
ALTER TABLE `typeconstructionworks`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `contractor`
--
ALTER TABLE `contractor`
  ADD CONSTRAINT `contractor_ibfk_1` FOREIGN KEY (`AdministratorConfirmedRegistration_ID`) REFERENCES `administrator` (`ID`) ON DELETE SET NULL;

--
-- Ограничения внешнего ключа таблицы `listconstructionworks`
--
ALTER TABLE `listconstructionworks`
  ADD CONSTRAINT `listconstructionworks_ibfk_2` FOREIGN KEY (`Project_ID`) REFERENCES `project` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `listconstructionworks_ibfk_3` FOREIGN KEY (`ManagingAdministrator_ID`) REFERENCES `administrator` (`ID`) ON DELETE SET NULL;

--
-- Ограничения внешнего ключа таблицы `offeredcontractors`
--
ALTER TABLE `offeredcontractors`
  ADD CONSTRAINT `offeredcontractors_ibfk_1` FOREIGN KEY (`Contractor_ID`) REFERENCES `contractor` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `offeredcontractors_ibfk_2` FOREIGN KEY (`Administrator_ID`) REFERENCES `administrator` (`ID`) ON DELETE SET NULL,
  ADD CONSTRAINT `offeredcontractors_ibfk_3` FOREIGN KEY (`Project_ID`) REFERENCES `project` (`ID`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`ApprovedContractor_ID`) REFERENCES `contractor` (`ID`) ON DELETE SET NULL,
  ADD CONSTRAINT `project_ibfk_2` FOREIGN KEY (`Customer_ID`) REFERENCES `customer` (`ID`) ON DELETE SET NULL,
  ADD CONSTRAINT `project_ibfk_3` FOREIGN KEY (`Administrator_ID`) REFERENCES `administrator` (`ID`) ON DELETE SET NULL;

--
-- Ограничения внешнего ключа таблицы `typeconstructionworks`
--
ALTER TABLE `typeconstructionworks`
  ADD CONSTRAINT `listconstructionworks` FOREIGN KEY (`listConstructionWorks_ID`) REFERENCES `listconstructionworks` (`ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
