import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, ActivityIndicator, ScrollView } from 'react-native';
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
    paddingVertical: 150,
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
    backgroundColor: '#f9f9f9',  // Thêm màu nền
    borderRadius: 10, // Bo góc cho phần chứa
    width: '100%',
  },
  evolutionTitle: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#FF4500', // Màu cam sáng cho chữ
    textAlign: 'center', // Căn giữa tiêu đề
    marginBottom: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    
    // Shadow đa lớp để tạo chiều sâu
    textShadowColor: 'rgba(255, 215, 0, 0.8)', // Bóng sáng vàng đầu tiên
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    shadowColor: '#FFD700',  // Màu vàng đậm cho bóng thêm chiều sâu
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  
    // Viền kép và gradient nền
    borderWidth: 3, 
    borderColor: '#FFD700', // Viền vàng gold
    borderRadius: 12, 
    borderStyle: 'solid',
  
    // Gradient nền (sử dụng nếu có thư viện hỗ trợ LinearGradient như 'expo-linear-gradient')
    backgroundColor: 'rgba(255, 165, 0, 0.2)', // Màu nền cam nhẹ
    overflow: 'hidden', // Cắt bớt viền nếu có
  },
  evolutionCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  evolutionDetail: {
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  emptyCard: {
    width: 150,
    height: 150, // Thêm chiều cao cho các thẻ rỗng giống App.tsx
    backgroundColor: 'transparent',
  },
  evolutionText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    marginHorizontal: 5,
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