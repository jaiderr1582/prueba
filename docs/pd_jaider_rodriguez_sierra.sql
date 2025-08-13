/*
create database p_Jaider_Rodriguez_Sierra;
use p_Jaider_Rodriguez_Sierra
*/

create table customers (
id_customer int primary key auto_increment,
name_customer varchar(240) not null,
identification_number varchar(50) unique not null,
address varchar(220) null,
phone varchar(40) not null unique,
email varchar(200) not null unique,
platform_used varchar(20),
created_at timestamp default current_timestamp,
updated_at timestamp default current_timestamp on update current_timestamp
);


create table transactions (
id_transaction varchar(20) primary key,
date_time datetime not null,
amount varchar(20) not null,
state enum ("pendiente", "completada", "fallida") default null,
type_transaction varchar(50),
id_customer int,
created_at timestamp default current_timestamp,
updated_at timestamp default current_timestamp on update current_timestamp,

foreign key (id_customer) references customers(id_customer)on update cascade on delete set null
);


create table bills (
id_bill int primary key auto_increment,
name_bill varchar(50) not null unique,
billing_period varchar(50),
amount_bill varchar(50),
amount_paid varchar(20),
id_transaction varchar(20),
created_at timestamp default current_timestamp,
updated_at timestamp default current_timestamp on update current_timestamp,

foreign key (id_transaction) references transactions(id_transaction)on update cascade on delete set null
);


