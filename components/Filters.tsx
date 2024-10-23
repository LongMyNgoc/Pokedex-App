import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface FilterProps {
  selectedGen: string | undefined;
  setSelectedGen: (value: string | undefined) => void;
  selectedType: string | undefined;
  setSelectedType: (value: string | undefined) => void;
}

const Filters: React.FC<FilterProps> = ({
  selectedGen,
  setSelectedGen,
  selectedType,
  setSelectedType,
}) => {
  return (
    <View style={styles.filtersContainer}>
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

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Type</Text>
        <Picker
          selectedValue={selectedType}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedType(itemValue)}
          dropdownIconColor="#FF3D00"
        >
          <Picker.Item label="All Type" value="" />
          <Picker.Item label="Normal" value="normal" />
          <Picker.Item label="Fire" value="fire" />
          <Picker.Item label="Water" value="water" />
          <Picker.Item label="Grass" value="grass" />
          <Picker.Item label="Electric" value="electric" />
          <Picker.Item label="Ice" value="ice" />
          <Picker.Item label="Fighting" value="fighting" />
          <Picker.Item label="Poison" value="poison" />
          <Picker.Item label="Ground" value="ground" />
          <Picker.Item label="Flying" value="flying" />
          <Picker.Item label="Psychic" value="psychic" />
          <Picker.Item label="Bug" value="bug" />
          <Picker.Item label="Rock" value="rock" />
          <Picker.Item label="Ghost" value="ghost" />
          <Picker.Item label="Dragon" value="dragon" />
          <Picker.Item label="Dark" value="dark" />
          <Picker.Item label="Steel" value="steel" />
          <Picker.Item label="Fairy" value="fairy" />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#ffffff', // Màu nền chính
    elevation: 5, // Đổ bóng
    shadowColor: '#000', // Màu bóng
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2, // Độ mờ của bóng
    shadowRadius: 2, // Độ lan tỏa của bóng
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333', // Màu chữ cho nhãn
    marginBottom: 8,
    textAlign: 'center', // Căn giữa nhãn
  },
  picker: {
    height: 50,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc', // Đường viền cho picker
    paddingLeft: 10,
  },
});

export default React.memo(Filters);
