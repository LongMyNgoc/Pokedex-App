import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native'; // Đảm bảo RouteProp được import
import { PokemonDetails } from '../styles/types'; // Đảm bảo import kiểu PokemonDetails

type PokemonDetailsScreenRouteProp = RouteProp<{ PokemonDetails: { pokemon: PokemonDetails } }, 'PokemonDetails'>;

interface Props {
  route: PokemonDetailsScreenRouteProp;
}

const PokemonDetailsScreen: React.FC<Props> = ({ route }) => {
  const { pokemon } = route.params; // Lấy Pokemon từ route

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pokemon.name || "Unknown Pokémon"}</Text>
      <Image source={{ uri: pokemon.sprite }} style={styles.image} />
      <Text>Number: {pokemon.number}</Text>
      <Text>Types: {pokemon.types.join(', ')}</Text>
      <Text>Generation: {pokemon.generation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});

export default PokemonDetailsScreen;
