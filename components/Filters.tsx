import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface FilterProps {
  selectedGen: string | undefined;
  setSelectedGen: (value: string | undefined) => void;
  selectedType: string | undefined;
  setSelectedType: (value: string | undefined) => void;
}

const typeColors: { [key: string]: string } = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  grass: '#7AC74C',
  electric: '#F7D02C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
  default: '#333', // Màu mặc định khi không chọn hệ
};

const Filters: React.FC<FilterProps> = ({
  selectedGen,
  setSelectedGen,
  selectedType,
  setSelectedType,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const types = Object.keys(typeColors); // Lấy danh sách các loại Pokémon

  return (
    <View style={styles.filtersContainer}>
      {/* Bộ lọc Generation */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Generation</Text>
        <Picker
          selectedValue={selectedGen}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedGen(itemValue)}
          dropdownIconColor="#FF3D00"
        >
          <Picker.Item label="All Gen" value="" />
          <Picker.Item label="Gen 1" value="Gen 1" />
          <Picker.Item label="Gen 2" value="Gen 2" />
          <Picker.Item label="Gen 3" value="Gen 3" />
          <Picker.Item label="Gen 4" value="Gen 4" />
          <Picker.Item label="Gen 5" value="Gen 5" />
          <Picker.Item label="Gen 6" value="Gen 6" />
          <Picker.Item label="Gen 7" value="Gen 7" />
          <Picker.Item label="Gen 8" value="Gen 8" />
          <Picker.Item label="Gen 9" value="Gen 9" />
        </Picker>
      </View>

      {/* Bộ lọc Type */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Type</Text>
        <TouchableOpacity
          style={[styles.selectedType, { backgroundColor: selectedType ? typeColors[selectedType] : '#fff' }]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.selectedTypeText}>
            {selectedType ? selectedType.charAt(0).toUpperCase() + selectedType.slice(1) : 'Select Type'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal cho loại Pokémon */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={types}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.typeItem, { backgroundColor: typeColors[item] }]}
                onPress={() => {
                  setSelectedType(item === 'default' ? '' : item); // Nếu là 'default', set thành chuỗi rỗng
                  setModalVisible(false);
                }}
              >
                <Text style={styles.typeText}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

// Các style không thay đổi
const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  selectedType: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTypeText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  typeItem: {
    padding: 15,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  typeText: {
    color: '#fff',
    fontWeight: '600',
  },
  picker: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 10,
  },
});

export default React.memo(Filters);
