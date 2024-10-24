import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { PokemonDetails } from '../styles/types'; 

type PokemonDetailsScreenRouteProp = RouteProp<{ PokemonDetails: { pokemon: PokemonDetails } }, 'PokemonDetails'>;

interface Props {
  route: PokemonDetailsScreenRouteProp;
}

// Hàm giúp viết hoa chữ cái đầu tiên của tên Pokémon
const capitalizeFirstLetter = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

// Hàm ánh xạ loại Pokémon sang màu sắc tương ứng
const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'grass':
      return '#78C850';
    case 'fire':
      return '#F08030';
    case 'water':
      return '#6890F0';
    case 'electric':
      return '#F8D030';
    case 'ice':
      return '#98D8D8';
    case 'fighting':
      return '#C03028';
    case 'poison':
      return '#A040A0';
    case 'ground':
      return '#E0C068';
    case 'flying':
      return '#A890F0';
    case 'psychic':
      return '#F85888';
    case 'bug':
      return '#A8B820';
    case 'rock':
      return '#B8A038';
    case 'ghost':
      return '#705898';
    case 'dragon':
      return '#7038F8';
    case 'dark':
      return '#705848';
    case 'steel':
      return '#B8B8D0';
    case 'fairy':
      return '#EE99AC';
    default:
      return '#A8A878'; // Màu mặc định nếu không xác định được loại
  }
};

const PokemonDetailsScreen: React.FC<Props> = ({ route }) => {
  const { pokemon } = route.params;

  return (
    <ImageBackground 
      source={require('../Pictures/Background_Detail.jpeg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Number: {pokemon.number}</Text>
        <Text style={styles.title}>{capitalizeFirstLetter(pokemon.name) || "Unknown Pokémon"}</Text>
        <Image source={{ uri: pokemon.sprite }} style={styles.image} />
        
        {/* Render các loại Pokémon với màu sắc tương ứng */}
        <View style={styles.typesContainer}>
          {pokemon.types.map((type) => (
            <Text key={type} style={[styles.type, { backgroundColor: getTypeColor(type) }]}>
              {capitalizeFirstLetter(type)}
            </Text>
          ))}
        </View>

        <Text style={styles.text}>Generation: {pokemon.generation}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  typesContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  type: {
    fontSize: 16,
    color: 'white', // Màu chữ trắng để dễ đọc trên nền màu
    padding: 5,
    margin: 5,
    borderRadius: 5,
    fontWeight: 'bold',
  },
});

export default PokemonDetailsScreen;
