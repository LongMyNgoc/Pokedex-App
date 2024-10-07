import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator } from 'react-native';
import PokemonCard from './components/PokemonCard';
import Filters from './components/Filters';
import useFetchPokemon from './hooks/useFetchPokemon';
import { styles } from './styles/styles';
import { PokemonDetails } from './styles/types';

const App: React.FC = () => {
  const [limit] = useState(151); // số lượng Pokémon tải lên mỗi lần
  const [offset, setOffset] = useState(0);
  const { pokemonList, loading } = useFetchPokemon(limit, offset);
  const [searchText, setSearchText] = useState('');
  const [selectedVersion, setSelectedVersion] = useState<string | undefined>(undefined);
  const [selectedGen, setSelectedGen] = useState<string | undefined>(undefined);
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);

  const filteredPokemon = pokemonList.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesVersion = selectedVersion ? pokemon.version === selectedVersion : true;
    const matchesGen = selectedGen ? pokemon.generation === selectedGen : true;
    const matchesType = selectedType ? pokemon.types.includes(selectedType) : true;
    return matchesSearch && matchesVersion && matchesGen && matchesType;
  });

  const handleLoadMore = () => {
    if (!loading) {
      setOffset(prev => prev + limit);
    }
  };

  if (loading && offset === 0) {
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
        selectedVersion={selectedVersion}
        setSelectedVersion={setSelectedVersion}
        selectedGen={selectedGen}
        setSelectedGen={setSelectedGen}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      <FlatList
        data={filteredPokemon}
        keyExtractor={(item) => item.name}
        numColumns={3}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#4CAF50" /> : null}
        onEndReached={handleLoadMore} // Gọi hàm khi cuộn đến cuối danh sách
        onEndReachedThreshold={0.1} // Khoảng cách đến cuối danh sách để tải thêm
      />
    </View>
  );
};

export default App;
