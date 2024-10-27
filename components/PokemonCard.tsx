import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, Dimensions, View, ImageBackground } from 'react-native';
import { PokemonDetails } from '../styles/types';

// Hàm trả về màu sắc dựa vào loại Pokémon
const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
        case 'fire': return '#F08030';
        case 'water': return '#6890F0';
        case 'grass': return '#78C850';
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
        case 'dark': return '#705848';
        case 'dragon': return '#7038F8';
        case 'steel': return '#B8B8D0';
        case 'fairy': return '#EE99AC';
        default: return '#A8A878'; // Màu xám mặc định cho các loại khác
    }
};

interface Props {
  pokemon: PokemonDetails; // Kiểu dữ liệu của Pokemon
  onPress: () => void; // Hàm sự kiện khi nhấn vào card
}

const PokemonCard: React.FC<Props> = React.memo(({ pokemon, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <ImageBackground
      source={require('../Pictures/Background.jpeg')}
      style={styles.background}
      imageStyle={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.header}>
        <View style={styles.typesContainer}>
          {pokemon.types.map((type) => (
            <Text key={type} style={[styles.type, { backgroundColor: getTypeColor(type) }]}>
              {type.toUpperCase()}
            </Text>
          ))}
        </View>
      </View>
      <Image source={{ uri: pokemon.sprite }} style={styles.image} />
      <Text style={styles.number}>#{pokemon.number}</Text>
      {/* Tên Pokemon được viết hoa chữ cái đầu và in đậm */}
      <Text style={styles.name}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Text>
    </ImageBackground>
  </TouchableOpacity>
), (prevProps, nextProps) => {
  return prevProps.pokemon.name === nextProps.pokemon.name; // Kiểm tra nếu Pokemon không thay đổi
});

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
    width: (Dimensions.get('window').width / 3) - 15,
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    borderRadius: 10,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'absolute',
    top: 5,
    left: 10,
    right: 10,
  },
  typesContainer: {
    flexDirection: 'row',
  },
  type: {
    fontSize: 10,
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    marginRight: 5,
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 130,
    marginTop: 20,
  },
  name: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold', // In đậm tên Pokemon
    color: 'white', // Màu chữ trắng
  },
  number: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white', // Màu chữ trắng
  },
});

export default PokemonCard;
