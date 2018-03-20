DROP DATABASE restaurants;

CREATE DATABASE restaurants;

\c restaurants;

CREATE TABLE banner (
  id int PRIMARY KEY,
  image1 text NOT NULL,
  image2 text NOT NULL,
  image3 text NOT NULL,
  image4 text NOT NULL
);

CREATE TABLE photo (
  id int PRIMARY KEY,
  image1 text NOT NULL,
  image2 text NOT NULL,
  image3 text NOT NULL
);

CREATE TABLE restaurant (
  id int PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  hours text NOT NULL,
  price text NOT NULL,
  style text NOT NULL,
  phone text NOT NULL,
  banner_id int NOT NULL REFERENCES banner (id),
  photo_id int NOT NULL REFERENCES photo (id)
);

\copy photo FROM 'millions/photo.csv' DELIMITER '#'
\copy banner FROM 'millions/banner.csv' DELIMITER '#'
\copy restaurant FROM 'millions/info.csv' DELIMITER '#' 

-- CREATE INDEX on restaurant (name);

