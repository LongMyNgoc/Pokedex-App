import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface FilterProps {
  selectedVersion: string | undefined;
  setSelectedVersion: (value: string | undefined) => void;
  selectedGen: string | undefined;
  setSelectedGen: (value: string | undefined) => void;
  selectedType: string | undefined;
  setSelectedType: (value: string | undefined) => void;
}

const Filters: React.FC<FilterProps> = ({
  selectedVersion,
  setSelectedVersion,
  selectedGen,
  setSelectedGen,
  selectedType,
  setSelectedType,
}) => {
  return (
    <View style={styles.filtersContainer}>
      <Picker
        selectedValue={selectedVersion}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedVersion(itemValue)}
      >
        <Picker.Item label="All Version" value="" />
        <Picker.Item label="Red/Blue" value="red-blue" />
      </Picker>

      <Picker
        selectedValue={selectedGen}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedGen(itemValue)}
      >
        <Picker.Item label="All Gen" value="" />
        <Picker.Item label="Gen 1" value="gen1" />
      </Picker>

      <Picker
        selectedValue={selectedType}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedType(itemValue)}
      >
        <Picker.Item label="All Type" value="" />
        <Picker.Item label="Fire" value="fire" />
        <Picker.Item label="Water" value="water" />
        <Picker.Item label="Grass" value="grass" />
      </Picker>
    </View>
  );
}
const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  picker: {
    height: 40,
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});

export default React.memo(Filters);

