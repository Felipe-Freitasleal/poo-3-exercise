import { Pokemon } from "../types";
import { BaseDatabase } from "./BaseDatabse";

export class PokemonsDatabase extends BaseDatabase {
  // atributos

  // métodos
  public static TABLE_POKEMONS = "pokemons";

  public insertPokemon = async (newPokemonDB: Pokemon): Promise<void> => {
    await BaseDatabase.connection(PokemonsDatabase.TABLE_POKEMONS).insert(
      newPokemonDB
    );
  };

  public getPokemons = async (
    query: string | undefined
  ): Promise<Pokemon[]> => {
    let pokemonDB;

    if (query) {
      const result: Pokemon[] = await BaseDatabase.connection(
        PokemonsDatabase.TABLE_POKEMONS
      ).where("name", "LIKE", `%${query}%`);

      pokemonDB = result;
    } else {
      const result: Pokemon[] = await BaseDatabase.connection(
        PokemonsDatabase.TABLE_POKEMONS
      );

      pokemonDB = result;
    }

    return pokemonDB;
  };

  public getPokemonById = async (id: string): Promise<Pokemon | undefined> => {
    const [result] = await BaseDatabase.connection(
      PokemonsDatabase.TABLE_POKEMONS
    ).where({
      id: id,
    });

    return result;
  };

  public updatePokemon = async (
    id: string,
    updatePokemon: Pokemon
  ): Promise<void> => {
    await BaseDatabase.connection(PokemonsDatabase.TABLE_POKEMONS)
      .update(updatePokemon)
      .where({ id: id });
  };

  public deletePokemon = async (id: string): Promise<void> => {
    await BaseDatabase.connection(PokemonsDatabase.TABLE_POKEMONS)
      .del()
      .where({ id: id });
  };
}
