import { useState, useEffect } from 'react';
import { PokemonDetails } from '../styles/types';

const useFetchPokemon = () => {
  const [pokemonList, setPokemonList] = useState<PokemonDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        // Fetch dữ liệu từ server của bạn
        const response = await fetch('https://pokedex-be.vercel.app/?vercelToolbarCode=UHQcDoQwgSSpuPR');
        const data = await response.json();

        // Đặt dữ liệu đã fetch vào state
        setPokemonList(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  return { pokemonList, loading };
};

export default useFetchPokemon;
