import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import PokemonCard from './components/PokemonCard';
import Filters from './components/Filters';
import useFetchPokemon from './hooks/useFetchPokemon';
import { styles } from './styles/styles';

// Lấy kích thước màn hình
const screenWidth = Dimensions.get('window').width;
const numColumns = screenWidth > 600 ? 3 : 2; // 3 cột cho màn hình lớn, 2 cột cho màn hình nhỏ

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

  // Tính toán số lượng mục trống cần thêm
  const remainder = filteredPokemon.length % numColumns;
  const emptyItems = remainder ? Array(numColumns - remainder).fill(null) : []; // Tạo các mục trống

  // Kết hợp danh sách Pokémon với các mục trống
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
        selectedVersion={selectedVersion}
        setSelectedVersion={setSelectedVersion}
        selectedGen={selectedGen}
        setSelectedGen={setSelectedGen}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      <FlatList
        data={displayData} // Sử dụng danh sách đã kết hợp
        key={numColumns.toString()} // Thêm key để buộc render lại FlatList khi số cột thay đổi
        keyExtractor={(item, index) => (item ? item.name : `empty-${index}`)} // Thay đổi key cho mục trống
        numColumns={numColumns} // Điều chỉnh số cột theo kích thước màn hình
        extraData={searchText}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 10 }} // Thêm khoảng cách giữa các cột
        renderItem={({ item }) => item ? <PokemonCard pokemon={item} /> : <View style={styles.emptyCard} />} // Hiển thị Pokémon hoặc ô trống
      />
    </View>
  );
};

export default App;
