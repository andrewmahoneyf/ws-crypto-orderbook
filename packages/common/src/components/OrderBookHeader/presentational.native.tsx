import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#121726',
    paddingLeft: 10,
    paddingRight: 10,
  },
  h1: {
    color: 'white',
  },
  picker: {
    color: 'white',
    width: 160,
  },
});

interface OrderBookHeaderProps {
  grouping: number;
  handleChange: (value: number) => void;
  options: number[];
}

const OrderBookHeaderPresentational: React.FC<OrderBookHeaderProps> = ({
  grouping,
  handleChange,
  options,
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.h1}>Order Book</Text>
      <Picker
        style={styles.picker}
        dropdownIconColor="white"
        selectedValue={grouping}
        onValueChange={itemValue => handleChange(itemValue)}>
        {options.map(opt => (
          <Picker.Item key={opt} label={`Group ${opt}`} value={opt} />
        ))}
      </Picker>
    </View>
  );
};

export default OrderBookHeaderPresentational;
