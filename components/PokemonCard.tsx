import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { PokemonDetails } from '../styles/types';

const PokemonCard = React.memo(({ pokemon }: { pokemon: PokemonDetails }) => (
    <TouchableOpacity style={styles.card}>
        <Image source={{ uri: pokemon.sprite }} style={styles.image} />
        <Text style={styles.name}>{pokemon.name}</Text>
        <Text style={styles.number}># {pokemon.number}</Text>
        <Text style={styles.types}>{pokemon.types.join(', ')}</Text>
    </TouchableOpacity>
), (prevProps, nextProps) => {
    return prevProps.pokemon.name === nextProps.pokemon.name;
});

const styles = StyleSheet.create({
    card: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        margin: 5,
        borderRadius: 10,
        width: (Dimensions.get('window').width / 3) - 15,
        elevation: 3,
    },
    image: {
        width: 80,
        height: 80,
    },
    name: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#333',
    },
    number: {
        fontSize: 12,
        color: '#666',
    },
    types: {
        fontSize: 12,
        color: '#666',
    },
});

export default PokemonCard;
