import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';

const PetFoodApp = () => {
  const [foodName, setFoodName] = useState('');
  const [petType, setPetType] = useState('Dog');
  const [quantity, setQuantity] = useState('1');
  const [foodList, setFoodList] = useState([]);
  const [errors, setErrors] = useState({
    foodName: false,
    petType: false,
    quantity: false
  });

  const validateInputs = () => {
    const newErrors = {
      foodName: !foodName.trim(),
      petType: !petType.trim(),
      quantity: isNaN(quantity) || parseInt(quantity) <= 0
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const addFoodItem = () => {
    if (!validateInputs()) {
      Alert.alert(
        'Invalid Input',
        'Please check your inputs and try again',
        [{ text: 'OK' }]
      );
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: foodName.trim(),
      type: petType.trim(),
      quantity: quantity,
    };

    setFoodList([...foodList, newItem]);
    resetForm();
  };

  const resetForm = () => {
    setFoodName('');
    setPetType('Dog');
    setQuantity('1');
    setErrors({
      foodName: false,
      petType: false,
      quantity: false
    });
  };

  const deleteItem = (id) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to remove this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => {
          setFoodList(foodList.filter(item => item.id !== id));
          Alert.alert('Success', 'Item deleted successfully');
        }},
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pet Food Tracker</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.foodName && styles.errorInput]}
          placeholder="Enter pet food name"
          value={foodName}
          onChangeText={(text) => {
            setFoodName(text);
            setErrors({...errors, foodName: false});
          }}
        />
        {errors.foodName && <Text style={styles.errorText}>Food name is required</Text>}

        <TextInput
          style={[styles.input, errors.petType && styles.errorInput]}
          placeholder="Pet type (Dog, Cat, etc.)"
          value={petType}
          onChangeText={(text) => {
            setPetType(text);
            setErrors({...errors, petType: false});
          }}
        />
        {errors.petType && <Text style={styles.errorText}>Pet type is required</Text>}

        <TextInput
          style={[styles.input, errors.quantity && styles.errorInput]}
          placeholder="Quantity"
          value={quantity}
          onChangeText={(text) => {
            setQuantity(text);
            setErrors({...errors, quantity: false});
          }}
          keyboardType="numeric"
        />
        {errors.quantity && <Text style={styles.errorText}>Must be a positive number</Text>}

        <Button title="Add to List" onPress={addFoodItem} />
      </View>

      <FlatList
        data={foodList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text>For: {item.type}</Text>
            <Text>Qty: {item.quantity}</Text>
            <Button
              title="Delete"
              onPress={() => deleteItem(item.id)}
              color="#ff4444"
            />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyList}>No pet food items added yet</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  errorInput: {
    borderColor: 'red',
    backgroundColor: '#ffeeee',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 12,
  },
  listItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  emptyList: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default PetFoodApp;