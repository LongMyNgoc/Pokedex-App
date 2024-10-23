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

const PokemonCard = React.memo(({ pokemon }: { pokemon: PokemonDetails }) => (
    <TouchableOpacity style={styles.card}>
        <ImageBackground
            source={require('../Pictures/Background.jpeg')} // Đường dẫn tới hình nền của bạn
            style={styles.background}
            imageStyle={styles.backgroundImage}
            resizeMode="cover" // Điều chỉnh cách hiển thị ảnh nền
        >
            {/* Vùng chứa loại Pokémon */}  
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
            <Text style={styles.number}>{pokemon.number}</Text>
            <Text style={styles.name}>{pokemon.name}</Text>
            {/* Số thứ tự của Pokémon hiển thị bên dưới tên */}
        </ImageBackground>
    </TouchableOpacity>
), (prevProps, nextProps) => {
    return prevProps.pokemon.name === nextProps.pokemon.name;
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
        overflow: 'hidden', // Để ẩn phần ngoài viền
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
        justifyContent: 'flex-start', // Căn loại Pokemon về bên trái
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
        marginRight: 5, // Khoảng cách giữa các loại
        textAlign: 'center',
    },
    image: {
        width: 150, // Kích thước ảnh Pokemon
        height: 150, // Kích thước ảnh Pokemon
        marginTop: 20,
    },
    name: {
        marginTop: 10,
        fontSize: 16, // Tăng kích thước tên Pokemon
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#FFFFFF', // Đổi màu tên Pokemon thành trắng
    },
    number: {
        fontSize: 14, // Giảm kích thước của số thứ tự
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginTop: 5, // Khoảng cách bên dưới tên Pokémon
    },
});

export default PokemonCard;
