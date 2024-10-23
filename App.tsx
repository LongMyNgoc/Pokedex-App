import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator } from 'react-native';
import PokemonCard from './components/PokemonCard';
import Filters from './components/Filters';
import useFetchPokemon from './hooks/useFetchPokemon';
import { styles } from './styles/styles';

const App: React.FC = () => {
  const { pokemonList, loading } = useFetchPokemon(); // Lấy danh sách Pokémon
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
        renderItem={({ item }) => <PokemonCard pokemon={item} />} // Gọi component hiển thị Pokémon
      />
    </View>
  );
};

export default App;
