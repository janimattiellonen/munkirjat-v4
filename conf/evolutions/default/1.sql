# --- Created by Slick DDL
# To stop Slick DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table `author` (`id` INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,`firstname` VARCHAR(45) NOT NULL,`lastname` VARCHAR(45) NOT NULL);
create table `book_author` (`book_id` INTEGER NOT NULL,`author_id` INTEGER NOT NULL);
alter table `book_author` add constraint `book_author_PK` primary key(`book_id`,`author_id`);
create table `book` (`id` INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,`title` VARCHAR(128) NOT NULL,`language_id` VARCHAR(3) NOT NULL,`page_count` INTEGER NOT NULL,`is_read` BOOLEAN NOT NULL,`isbn` VARCHAR(40) DEFAULT null,`created_at` TIMESTAMP NOT NULL,`updated_at` TIMESTAMP NOT NULL,`started_reading` TIMESTAMP DEFAULT null NULL,`finished_reading` TIMESTAMP DEFAULT null NULL,`rating` DOUBLE DEFAULT null,`price` DECIMAL(21,2) DEFAULT null);
create table `genre` (`id` INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,`name` VARCHAR(45) NOT NULL);
create table `logininfo` (`id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,`providerID` VARCHAR(254) NOT NULL,`providerKey` VARCHAR(254) NOT NULL);
create table `oauth1info` (`id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,`token` VARCHAR(254) NOT NULL,`secret` VARCHAR(254) NOT NULL,`loginInfoId` BIGINT NOT NULL);
create table `oauth2info` (`id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,`accesstoken` VARCHAR(254) NOT NULL,`tokentype` VARCHAR(254),`expiresin` INTEGER,`refreshtoken` VARCHAR(254),`logininfoid` BIGINT NOT NULL);
create table `passwordinfo` (`hasher` VARCHAR(254) NOT NULL,`password` VARCHAR(254) NOT NULL,`salt` VARCHAR(254),`loginInfoId` BIGINT NOT NULL);
create table `user` (`userID` VARCHAR(254) NOT NULL PRIMARY KEY,`firstName` VARCHAR(254),`lastName` VARCHAR(254),`fullName` VARCHAR(254),`email` VARCHAR(254),`avatarURL` VARCHAR(254));
create table `userlogininfo` (`userID` VARCHAR(254) NOT NULL,`loginInfoId` BIGINT NOT NULL);
create table `xi_tag` (`id` INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,`name` VARCHAR(50) NOT NULL,`slug` VARCHAR(50) NOT NULL,`created_at` TIMESTAMP NOT NULL,`updated_at` TIMESTAMP NOT NULL);
create unique index `UNIQ_AD374A565E237E06` on `xi_tag` (`name`);
create unique index `UNIQ_AD374A56989D9B62` on `xi_tag` (`slug`);
create table `xi_tagging` (`id` INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,`tag_id` INTEGER DEFAULT null,`resource_type` VARCHAR(50) NOT NULL,`resource_id` VARCHAR(50) NOT NULL,`created_at` TIMESTAMP NOT NULL,`updated_at` TIMESTAMP NOT NULL);
create unique index `tagging_idx` on `xi_tagging` (`tag_id`,`resource_type`,`resource_id`);
alter table `book_author` add constraint `FK_9478D34516A2B381` foreign key(`book_id`) references `book`(`id`) on update NO ACTION on delete NO ACTION;
alter table `book_author` add constraint `FK_9478D345F675F31B` foreign key(`author_id`) references `author`(`id`) on update NO ACTION on delete NO ACTION;
alter table `xi_tagging` add constraint `FK_431075D2BAD26311` foreign key(`tag_id`) references `xi_tag`(`id`) on update NO ACTION on delete NO ACTION;

# --- !Downs

ALTER TABLE xi_tagging DROP FOREIGN KEY FK_431075D2BAD26311;
ALTER TABLE book_author DROP FOREIGN KEY FK_9478D34516A2B381;
ALTER TABLE book_author DROP FOREIGN KEY FK_9478D345F675F31B;
drop table `xi_tagging`;
drop table `xi_tag`;
drop table `userlogininfo`;
drop table `user`;
drop table `passwordinfo`;
drop table `oauth2info`;
drop table `oauth1info`;
drop table `logininfo`;
drop table `genre`;
drop table `book`;
ALTER TABLE book_author DROP PRIMARY KEY;
drop table `book_author`;
drop table `author`;

