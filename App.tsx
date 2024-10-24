import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PokemonCard from './components/PokemonCard';
import Filters from './components/Filters';
import useFetchPokemon from './hooks/useFetchPokemon';
import { styles } from './styles/styles';
import PokemonDetailsScreen from './components/PokemonDetailScreen';
import { PokemonDetails } from './styles/types';

const Stack = createStackNavigator();

const PokedexScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { pokemonList, loading } = useFetchPokemon(); // Fetch dữ liệu Pokemon
  const [searchText, setSearchText] = useState(''); // Lưu trữ tìm kiếm
  const [selectedGen, setSelectedGen] = useState<string | undefined>(undefined);
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);

  // Lọc danh sách Pokemon theo tìm kiếm, thế hệ và loại
  const filteredPokemon = pokemonList.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesGen = selectedGen ? pokemon.generation === selectedGen : true;
    const matchesType = selectedType ? pokemon.types.includes(selectedType) : true;
    return matchesSearch && matchesGen && matchesType;
  });

  const remainder = filteredPokemon.length % 2;
  const emptyItems = remainder ? Array(2 - remainder).fill(null) : [];
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
        data={displayData}
        keyExtractor={(item, index) => (item ? item.name : `empty-${index}`)}
        numColumns={2}
        extraData={searchText}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 10 }}
        renderItem={({ item }) =>
          item ? (
            <PokemonCard
              pokemon={item}
              onPress={() => navigation.navigate('PokemonDetails', { pokemon: item })} // Truyền Pokemon vào chi tiết
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
          component={PokemonDetailsScreen as React.FC<any>} // Chỉ định kiểu React.FC<any>
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
