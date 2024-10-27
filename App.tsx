import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PokemonCard from './components/PokemonCard';
import Filters from './components/Filters';
import useFetchPokemon from './hooks/useFetchPokemon';
import { styles } from './styles/styles';
import PokemonDetailsScreen from './components/PokemonDetailScreen';
import { PokemonDetails } from './styles/types';

export type RootStackParamList = {
  Pokedex: undefined;
  PokemonDetails: { pokemon: PokemonDetails; pokemonList: PokemonDetails[] };
};

const Stack = createStackNavigator<RootStackParamList>();

const PokedexScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { pokemonList, loading } = useFetchPokemon();
  const [searchText, setSearchText] = useState('');
  const [selectedGen, setSelectedGen] = useState<string | undefined>(undefined);
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
  const { width } = useWindowDimensions(); // Lấy chiều rộng màn hình

  // Tính toán numColumns dựa trên chiều rộng màn hình (ví dụ: mỗi card chiếm khoảng 150 px)
  const numColumns = Math.max(1, Math.floor(width / 150));

  // Tạo `key` mới cho `FlatList` mỗi khi `numColumns` thay đổi để buộc render lại
  const flatListKey = `flatlist-${numColumns}`;

  const filteredPokemon = pokemonList.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesGen = selectedGen ? pokemon.generation === selectedGen : true;
    const matchesType = selectedType ? pokemon.types.includes(selectedType) : true;
    return matchesSearch && matchesGen && matchesType;
  });

  const remainder = filteredPokemon.length % numColumns;
  const emptyItems = remainder ? Array(numColumns - remainder).fill(null) : [];
  const displayData = [...filteredPokemon, ...emptyItems];

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokedex</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Pokémon"
        value={searchText}
        onChangeText={setSearchText}
      />
      <Filters
        selectedGen={selectedGen}
        setSelectedGen={setSelectedGen}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      <FlatList
        key={flatListKey} // Đảm bảo `FlatList` render lại khi `numColumns` thay đổi
        data={displayData}
        keyExtractor={(item, index) => (item ? item.name : `empty-${index}`)}
        numColumns={numColumns}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 10 }}
        renderItem={({ item }) =>
          item ? (
            <PokemonCard
              pokemon={item}
              onPress={() =>
                navigation.navigate('PokemonDetails', {
                  pokemon: item,
                  pokemonList,
                })
              }
            />
          ) : (
            <View style={styles.emptyCard} />
          )
        }
      />
    </View>
  );
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pokedex" component={PokedexScreen} />
        <Stack.Screen
          name="PokemonDetails"
          component={PokemonDetailsScreen as React.FC<any>}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
