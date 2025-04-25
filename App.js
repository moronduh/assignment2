import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [foodItem, setFoodItem] = useState('');
  const [foodList, setFoodList] = useState([]);

  const addFoodItem = () => {
    const trimmed = foodItem.trim();
    
    // Check for empty input
    if (trimmed.length === 0) {
      Alert.alert('Error', 'Please enter a food item');
      return;
    }
    
    // Check for duplicate items (case insensitive)
    const isDuplicate = foodList.some(item => 
      item.name.toLowerCase() === trimmed.toLowerCase()
    );
    
    if (isDuplicate) {
      Alert.alert('Error', 'This food item already exists in the list');
      return;
    }
    
    // Add the item if not empty and not duplicate
    setFoodList(prev => [...prev, { id: Date.now().toString(), name: trimmed }]);
    setFoodItem('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pet Food Tracker</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter pet food item"
        value={foodItem}
        onChangeText={setFoodItem}
      />
      <Button title="Add Item" onPress={addFoodItem} />
      <FlatList
        data={foodList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>{item.name}</Text>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#a6e2b3',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  list: {
    marginTop: 20,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
});
