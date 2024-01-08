CREATE DATABASE travelsApp;
USE travelsApp;

CREATE TABLE user (
	user_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(15) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    address VARCHAR(100),
    user_city VARCHAR(80),
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    user_img VARCHAR(200),
    type tinyint NOT NULL,
    is_deleted BOOLEAN default 0
);


CREATE TABLE travel (
	travel_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    travel_city VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    is_deleted BOOLEAN default 0,
    user_id INT unsigned NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE picture (
	picture_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    picture_img VARCHAR(200) NOT NULL,
    is_deleted BOOLEAN default 0,
    travel_id INT unsigned NOT NULL,
    CONSTRAINT fk_travel_id FOREIGN KEY (travel_id) REFERENCES travel(travel_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- drop table picture;
-- select * from users;