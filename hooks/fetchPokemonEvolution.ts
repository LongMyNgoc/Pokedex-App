import { useState, useEffect } from 'react';
import { PokemonEvolution } from '../styles/types';

const useFetchPokemonEvolution = (pokemonName: string) => {
  const [evolutionData, setEvolutionData] = useState<PokemonEvolution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvolutionData = async () => {
      setLoading(true);
      try {
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName.toLowerCase()}/`);
        if (!speciesResponse.ok) {
          throw new Error('Failed to fetch Pokémon species');
        }
        const speciesData = await speciesResponse.json();
        const pokemonId = speciesData.evolution_chain.url.split('/').slice(-2, -1)[0]; // Lấy ID từ đường dẫn chuỗi tiến hóa

        const evolutionResponse = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokemonId}/`);
        if (!evolutionResponse.ok) {
          throw new Error('Failed to fetch evolution chain');
        }
        const evolutionData = await evolutionResponse.json();

        const extractEvolutions = (chain: any): PokemonEvolution[] => {
          const evolutions: PokemonEvolution[] = [];

          const traverseChain = (evolutionChain: any) => {
            const speciesName = evolutionChain.species.name;

            const evolutionDetails = evolutionChain.evolution_details[0] || {};

            evolutions.push({
              number: parseInt(evolutionChain.species.url.split('/').slice(-2)[0]),
              id: parseInt(evolutionChain.species.url.split('/').slice(-2)[0]),
              name: speciesName,
              evolution_trigger: evolutionDetails.trigger?.name || '',
              min_level: evolutionDetails.min_level || null,
              item: evolutionDetails.item ? evolutionDetails.item.name : undefined,
              evolved_species_id: parseInt(evolutionChain.species.url.split('/').slice(-2)[0]),
            });

            if (evolutionChain.evolves_to.length > 0) {
              evolutionChain.evolves_to.forEach(traverseChain);
            }
          };

          traverseChain(chain);
          return evolutions;
        };

        const evolutions = extractEvolutions(evolutionData.chain);
        setEvolutionData(evolutions);
      } catch (error: unknown) {
        console.error('Error fetching evolution data:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (pokemonName) {
      fetchEvolutionData();
    }
  }, [pokemonName]);

  return { evolutionData, loading, error };
};

export default useFetchPokemonEvolution;
