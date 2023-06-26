ALTER TABLE `project` ADD `contractDoc` VARCHAR(300) NULL AFTER `FullBuldingAdress`;
ALTER TABLE `project` CHANGE `FullBuldingAdress` `FullBuldingAdress` VARCHAR(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL;
CREATE TABLE buildingmaterials ( `ID` INT NOT NULL AUTO_INCREMENT , `Project_ID` INT NOT NULL , `DataCreation` DATETIME NOT NULL , `buildingMaterials` VARCHAR(400) NOT NULL , `cost` INT NOT NULL, `supplierBuildingMaterials` VARCHAR(400) NOT NULL , `volume` VARCHAR(400)NOT NULL , PRIMARY KEY (`ID`));
CREATE TABLE constructionprojects ( `ID` INT NOT NULL AUTO_INCREMENT , `Project_ID` INT NOT NULL , `DataCreation` DATETIME NOT NULL , `nameConstruction` VARCHAR(400) NOT NULL, `description` TEXT NOT NULL ,`FullBuldingAdress` VARCHAR(400) NOT NULL, PRIMARY KEY (`ID`));
ALTER TABLE `users` ADD `resetToken` TEXT NULL AFTER `Email`;
ALTER TABLE `project` ADD `description` TEXT NULL AFTER `contractDoc`;
ALTER TABLE `offeredcontractors` ADD `description` TEXT NULL AFTER `Administrator_ID`;