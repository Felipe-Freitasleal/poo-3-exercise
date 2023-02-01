-- Active: 1675262823315@@127.0.0.1@3306
CREATE TABLE pokemons (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    hp INTEGER NOT NULL,
    attack INTEGER NOT NULL,
    defense INTEGER NOT NULL
);

INSERT INTO pokemons (id, name, type, hp, attack, defense)
VALUES ("p0001", "Bulbassauro", "Grama, Veneno", 45, 25, 35),
("p0002", "Charmander", "Fogo", 40, 35, 30),
("p0003", "", "Água", 40, 25, 40);

SELECT * FROM pokemons;