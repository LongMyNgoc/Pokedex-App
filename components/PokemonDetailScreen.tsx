import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, ActivityIndicator, ScrollView, Dimensions, Platform, ViewStyle } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { PokemonDetails, PokemonEvolution } from '../styles/types';
import useFetchPokemonEvolution from '../hooks/fetchPokemonEvolution';
import PokemonCard from './PokemonCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type PokemonDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PokemonDetails'>;
type PokemonDetailsScreenRouteProp = RouteProp<{ PokemonDetails: { pokemon: PokemonDetails, pokemonList: PokemonDetails[] } }, 'PokemonDetails'>;

interface Props {
  route: PokemonDetailsScreenRouteProp;
}

const { width, height } = Dimensions.get('window');

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
  const navigation = useNavigation<PokemonDetailsScreenNavigationProp>();

  const evolutionPokemonCards = evolutionData
    .map(evolution => ({
      ...evolution,
      details: pokemonList.find(p => p.number === evolution.id)
    }))
    .filter((evolution): evolution is PokemonEvolution & { details: PokemonDetails } => evolution.details !== undefined);

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
              <Text key={type} style={[styles.type, { backgroundColor: getTypeColor(type) }]}>{capitalizeFirstLetter(type)}</Text>
            ))}
          </View>

          <Text style={styles.text}>Generation: {pokemon.generation}</Text>
        </View>
      </ImageBackground>

      <View style={styles.evolutionContainer}>
        <Text style={styles.evolutionTitle}>Evolutions</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.errorText}>Error: {error}</Text>
        ) : evolutionPokemonCards.length > 0 ? (
          <View style={styles.evolutionCards}>
            {evolutionPokemonCards.map(({ details: evolutionPokemon, evolution_trigger, min_level, item }, index) => (
              <View key={evolutionPokemon.number} style={styles.evolutionDetail}>
                {index !== 0 && (
                  <>
                    <Text style={styles.evolutionText}>Evolution Method: {capitalizeFirstLetter(evolution_trigger)}</Text>
                    {min_level && <Text style={styles.evolutionText}>Level: {min_level}</Text>}
                    {item && <Text style={styles.evolutionText}>Item: {item}</Text>}
                  </>
                )}
                <PokemonCard 
                  pokemon={evolutionPokemon} 
                  onPress={() => 
                    navigation.navigate('PokemonDetails', { 
                      pokemon: evolutionPokemon, 
                      pokemonList 
                    })
                  } 
                />
              </View>
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
    paddingVertical: height * 0.2,
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: height * 0.05,
  },
  detailContainer: {
    padding: width * 0.05,
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  image: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 10,
  },
  text: {
    fontSize: width * 0.04,
    color: 'black',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  typesContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  type: {
    fontSize: width * 0.04,
    color: 'white',
    padding: 5,
    margin: 5,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  evolutionContainer: {
    marginTop: height * 0.05,
    padding: width * 0.05,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    width: '100%',
  },
  evolutionTitle: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#FF4500',
    textAlign: 'center',
    marginBottom: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    textShadowColor: 'rgba(255, 215, 0, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    shadowColor: '#FFD700',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    borderWidth: 3,
    borderColor: '#FFD700',
    borderRadius: 12,
    backgroundColor: 'rgba(255, 165, 0, 0.2)',
    overflow: 'hidden',
  },
  evolutionCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%', // Thêm để đảm bảo không bị cắt
  },
  evolutionDetail: {
    alignItems: 'center',
    marginBottom: 10,
    width: '100%', // Thay đổi kích thước
    justifyContent: 'center', // Giữa cho các thẻ
  },
  evolutionText: {
    fontSize: width * 0.035,
    color: 'black',
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  errorText: {
    fontSize: width * 0.04,
    color: 'red',
    fontWeight: 'bold',
  },
  noEvolutionText: {
    fontSize: width * 0.04,
    color: 'gray',
    fontStyle: 'italic',
  },
});

export default PokemonDetailsScreen;
