
create table users (
    users_id serial PRIMARY KEY,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    created_by timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

create table tech_blog (
    tech_blog_id serial PRIMARY KEY,
    image text NOT NULL,
    title varchar(255) NOT NULL,
    description text NOT NULL,
    tag varchar(255) NOT NULL,
    users_id integer REFERENCES users (users_id),
    created_by timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_by timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);