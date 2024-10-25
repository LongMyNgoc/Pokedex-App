import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, ActivityIndicator, ScrollView } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { PokemonDetails } from '../styles/types';
import useFetchPokemonEvolution from '../hooks/fetchPokemonEvolution';
import PokemonCard from './PokemonCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Đảm bảo đường dẫn đúng

type PokemonDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PokemonDetails'
>;

type PokemonDetailsScreenRouteProp = RouteProp<{ PokemonDetails: { pokemon: PokemonDetails, pokemonList: PokemonDetails[] } }, 'PokemonDetails'>;

interface Props {
  route: PokemonDetailsScreenRouteProp;
}

const capitalizeFirstLetter = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);

const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'grass': return '#78C850';
    case 'fire': return '#F08030';
    case 'water': return '#6890F0';
    case 'electric': return '#F8D030';
    case 'ice': return '#98D8D8';
    case 'fighting': return '#C03028';
    case 'poison': return '#A040A0';
    case 'ground': return '#E0C068';
    case 'flying': return '#A890F0';
    case 'psychic': return '#F85888';
    case 'bug': return '#A8B820';
    case 'rock': return '#B8A038';
    case 'ghost': return '#705898';
    case 'dragon': return '#7038F8';
    case 'dark': return '#705848';
    case 'steel': return '#B8B8D0';
    case 'fairy': return '#EE99AC';
    default: return '#A8A878';
  }
};

const PokemonDetailsScreen: React.FC<Props> = ({ route }) => {
  const { pokemon, pokemonList } = route.params;
  const { evolutionData, loading, error } = useFetchPokemonEvolution(pokemon.name.toLowerCase());

  const navigation = useNavigation<PokemonDetailsScreenNavigationProp>(); // Dùng kiểu đã khai báo

  const evolutionPokemonCards = evolutionData
    .map(evolution => pokemonList.find(p => p.number === evolution.id))
    .filter((pokemon): pokemon is PokemonDetails => pokemon !== undefined);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <ImageBackground 
        source={require('../Pictures/Background_Detail.jpeg')}
        style={styles.background}
      >
        <View style={styles.detailContainer}>
          <Text style={styles.text}>Number: {pokemon.number}</Text>
          <Text style={styles.title}>{capitalizeFirstLetter(pokemon.name) || "Unknown Pokémon"}</Text>
          <Image source={{ uri: pokemon.sprite }} style={styles.image} />

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

      <View style={styles.evolutionContainer}>
        <Text style={styles.evolutionTitle}>Evolutions:</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.errorText}>Error: {error}</Text>
        ) : evolutionPokemonCards.length > 0 ? (
          <View style={styles.evolutionCards}>
            {evolutionPokemonCards.map((evolutionPokemon) => (
              <PokemonCard 
                key={evolutionPokemon.number} 
                pokemon={evolutionPokemon} 
                onPress={() => 
                  navigation.navigate('PokemonDetails', { 
                    pokemon: evolutionPokemon, 
                    pokemonList 
                  })
                } 
              />
            ))}
          </View>
        ) : (
          <Text style={styles.noEvolutionText}>No Evolutions</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    paddingVertical: 30,
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  detailContainer: {
    padding: 20,
    alignItems: 'center',
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
    color: 'white',
    padding: 5,
    margin: 5,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  evolutionContainer: {
    marginTop: 30,
    padding: 20,
    alignItems: 'center',
  },
  evolutionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  evolutionCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  noEvolutionText: {
    fontSize: 16,
    color: 'gray',
    fontStyle: 'italic',
  },
});

export default PokemonDetailsScreen;
