
create table users (
    users_id serial PRIMARY KEY,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    created_by timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
)