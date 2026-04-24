create database auth_db;
use auth_db;

create table user(
id int auto_increment primary key,
name varchar(100),
email varchar(100) unique,
password varchar(255),
created_at timestamp default current_timestamp);

ALTER TABLE user
ADD otp VARCHAR(10),
ADD otp_expiry BIGINT;

ALTER TABLE user ADD refresh_token TEXT;

ALTER TABLE user ADD role VARCHAR(20) DEFAULT 'user';

select * from user;
truncate table user;


