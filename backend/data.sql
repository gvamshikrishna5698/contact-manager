#mySql Script

use contact_management;

create table `contact` (
	`contactId` int(10) not null AUTO_INCREMENT,
    `firstName` varchar(15) not null,
    `lastName` varchar(15) not null,
    `email` varchar(50) not null,
    `country_code` varchar(5) not null,
    `number` varchar(10) not null,
    PRIMARY KEY (`contactId`)
);

create table `user` (
	`id` int(10) not null AUTO_INCREMENT,
    `email` varchar(15) not null,
    `password` varchar(15) not null,
    PRIMARY KEY (`id`)
);

