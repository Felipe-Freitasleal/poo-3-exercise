import { Request, Response } from "express";
import { PokemonsDatabase } from "../data/PokemonsDatabase";
import { Pokemons } from "../models/Pokemon";
import { Pokemon } from "../types";

export class PokemonController {
  public getPokemons = async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;

      const pokemonsDatabase = new PokemonsDatabase();
      const result = await pokemonsDatabase.getPokemons(query);

      const poke = result.map(
        (pokemon) =>
          new Pokemons(
            pokemon.id,
            pokemon.name,
            pokemon.type,
            pokemon.hp,
            pokemon.attack,
            pokemon.defense
          )
      );

      res.status(200).send(poke);
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public postPokemon = async (req: Request, res: Response) => {
    try {
      const { id, name, type, hp, attack, defense } = req.body as Pokemon;

      if (typeof id !== "string") {
        res.status(400);
        throw new Error("'id' deve ser string");
      }

      if (typeof name !== "string") {
        res.status(400);
        throw new Error("'name' deve ser string");
      }

      if (typeof type !== "string") {
        res.status(400);
        throw new Error("'tipo' deve ser string");
      }

      if (typeof hp !== "number") {
        res.status(400);
        throw new Error("'HP' deve ser número");
      }

      if (typeof attack !== "number") {
        res.status(400);
        throw new Error("'Attack' deve ser número");
      }

      if (typeof defense !== "number") {
        res.status(400);
        throw new Error("'Defense' deve ser número");
      }

      const pokemonsDatabase = new PokemonsDatabase();
      const checkPokemonExist = await pokemonsDatabase.getPokemonById(id);

      if (checkPokemonExist) {
        res.status(400);
        throw new Error("Pokémon já existe");
      }

      const newPokemon = new Pokemons(id, name, type, hp, attack, defense);

      const newPokemonDB: Pokemon = {
        id: newPokemon.getId(),
        type: newPokemon.getType(),
        name: newPokemon.getName(),
        hp: newPokemon.getHp(),
        attack: newPokemon.getAttack(),
        defense: newPokemon.getDefense(),
      };

      await pokemonsDatabase.insertPokemon(newPokemonDB);
      res
        .status(200)
        .send({ message: "Pokémon criado.", pokemon: newPokemonDB });
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public updatePokemon = async (req: Request, res: Response) => {
    try {
      const { idPokemon } = req.params;
      const { id, name, type, hp, attack, defense } = req.body as Pokemon;

      const pokemonsDatabase = new PokemonsDatabase();
      const checkPokemonExist = await pokemonsDatabase.getPokemonById(
        idPokemon
      );

      if (typeof id !== "string") {
        res.status(400);
        throw new Error("'id' deve ser string");
      }

      if (typeof name !== "string") {
        res.status(400);
        throw new Error("'name' deve ser string");
      }

      if (typeof type !== "string") {
        res.status(400);
        throw new Error("'tipo' deve ser string");
      }

      if (typeof hp !== "number") {
        res.status(400);
        throw new Error("'HP' deve ser número");
      }

      if (typeof attack !== "number") {
        res.status(400);
        throw new Error("'Attack' deve ser número");
      }

      if (typeof defense !== "number") {
        res.status(400);
        throw new Error("'Defense' deve ser número");
      }

      if (!checkPokemonExist) {
        res.status(400);
        throw new Error("Pokémon não encontrado");
      }

      const pokemonFinded = new Pokemons(
        checkPokemonExist.id,
        checkPokemonExist.name,
        checkPokemonExist.type,
        checkPokemonExist.hp,
        checkPokemonExist.attack,
        checkPokemonExist.defense
      );

      const pokemonUpdateDB: Pokemon = {
        id: pokemonFinded.getId() || id,
        type: pokemonFinded.getType() || name,
        name: pokemonFinded.getName() || type,
        hp: pokemonFinded.getHp() || hp,
        attack: pokemonFinded.getAttack() || attack,
        defense: pokemonFinded.getDefense() || defense,
      };

      await pokemonsDatabase.updatePokemon(id, pokemonUpdateDB);
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public deletePokemon = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const pokemonsDatabase = new PokemonsDatabase();
      const checkPokemonExist = await pokemonsDatabase.getPokemonById(id);

      if (!checkPokemonExist) {
        res.status(400);
        throw new Error("Pokémon não encontrado");
      }

      if (checkPokemonExist) {
        await pokemonsDatabase.deletePokemon(id);
        res.status(200).send({ message: "Pokémon excluído" });
      }
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };
}
