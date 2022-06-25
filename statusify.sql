CREATE TABLE IF NOT EXISTS users
(
    id bigserial
        constraint users_pk
            primary key,
    emoji varchar(255) not null,
    description varchar(255),
    imageProfile varchar(255),
    expiredAt timestamp
);

CREATE TABLE IF NOT EXISTS friends
(
    id bigserial
        constraint friend_pk
            primary key,
    userId bigint not null,
    interesting boolean default false not null
);

CREATE TABLE IF NOT EXISTS notifications
(
    id bigserial
        constraint notifications_pk
            primary key,
    targetUserId bigint not null,
    emoji varchar(255) not null,
    type varchar(255) not null
);
