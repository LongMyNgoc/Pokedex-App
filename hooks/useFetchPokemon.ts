import { useState, useEffect } from 'react';
import { PokemonDetails } from '../styles/types';

const useFetchPokemon = (limit = 151, offset = 0) => {
  const [pokemonList, setPokemonList] = useState<PokemonDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data = await response.json();

        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon: { name: string; url: string }, index: number) => {
            const pokemonData = await fetch(pokemon.url);
            const pokemonDetails = await pokemonData.json();

            return {
              name: pokemonDetails.name,
              sprite: pokemonDetails.sprites.front_default,
              types: pokemonDetails.types.map((type: any) => type.type.name),
              generation: 'Gen 1',
              version: 'Red/Blue',
              number: index + offset + 1, // Thêm số thứ tự ở đây
            };
          })
        );

        setPokemonList((prev) => [...prev, ...detailedPokemon]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [limit, offset]);

  return { pokemonList, loading };
};

export default useFetchPokemon;
