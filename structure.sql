-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema Grupo-15-Gabook
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Grupo-15-Gabook
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Grupo-15-Gabook` DEFAULT CHARACTER SET latin1 ;
USE `Grupo-15-Gabook` ;

-- -----------------------------------------------------
-- Table `Grupo-15-Gabook`.`genres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Grupo-15-Gabook`.`genres` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `Grupo-15-Gabook`.`languages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Grupo-15-Gabook`.`languages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `Grupo-15-Gabook`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Grupo-15-Gabook`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `role` INT NOT NULL,
  `image` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 35
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `Grupo-15-Gabook`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Grupo-15-Gabook`.`orders` (
  `id` INT NOT NULL,
  `total` INT NOT NULL,
  `date` VARCHAR(30) NULL DEFAULT NULL,
  `Users_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Orders_Users1_idx` (`Users_id` ASC) ,
  CONSTRAINT `fk_Orders_Users1`
    FOREIGN KEY (`Users_id`)
    REFERENCES `Grupo-15-Gabook`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `Grupo-15-Gabook`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Grupo-15-Gabook`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `description` LONGTEXT NOT NULL,
  `isbn` VARCHAR(45) NOT NULL,
  `year` VARCHAR(45) NOT NULL,
  `author` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  `discount` INT NOT NULL,
  `image` VARCHAR(200) NOT NULL,
  `languages_id` INT NOT NULL,
  `genres_id` INT NOT NULL,
  `editorial` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Products_languages1_idx` (`languages_id` ASC) ,
  INDEX `fk_products_genres1_idx` (`genres_id` ASC) ,
  CONSTRAINT `fk_products_genres1`
    FOREIGN KEY (`genres_id`)
    REFERENCES `Grupo-15-Gabook`.`genres` (`id`),
  CONSTRAINT `fk_Products_languages1`
    FOREIGN KEY (`languages_id`)
    REFERENCES `Grupo-15-Gabook`.`languages` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `Grupo-15-Gabook`.`orders_has_products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Grupo-15-Gabook`.`orders_has_products` (
  `orders_id` INT NOT NULL,
  `products_id` INT NOT NULL,
  PRIMARY KEY (`orders_id`, `products_id`),
  INDEX `fk_orders_has_products_products1_idx` (`products_id` ASC) ,
  INDEX `fk_orders_has_products_orders1_idx` (`orders_id` ASC) ,
  CONSTRAINT `fk_orders_has_products_orders1`
    FOREIGN KEY (`orders_id`)
    REFERENCES `Grupo-15-Gabook`.`orders` (`id`),
  CONSTRAINT `fk_orders_has_products_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `Grupo-15-Gabook`.`products` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `Grupo-15-Gabook`.`stock`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Grupo-15-Gabook`.`stock` (
  `id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `products_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_stock_products1_idx` (`products_id` ASC) ,
  CONSTRAINT `fk_stock_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `Grupo-15-Gabook`.`products` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
