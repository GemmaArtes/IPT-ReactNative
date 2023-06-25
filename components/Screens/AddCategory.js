import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  DrawerLayoutAndroid,
} from 'react-native';
import axios from 'axios';

const AddCategory = () => {
  const [formData, setFormData] = useState({
    type: '',
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    axios
      .post('http://localhost:8000/api/v1/inventory/api/categories/', formData)
      .then(response => {
        alert('Category added successfully!');
        setFormData({
          type: '',
        });
      })
      .catch(error => {
        console.log(error);
        alert('Error adding category!');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Inventory System</Text>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <View style={styles.box}>
        <Text> </Text>
        <Text style={styles.boxTitle}>Add New Category</Text>

        <Text style={styles.inputLabel}>Type:</Text>
        <TextInput
          style={styles.input}
          value={formData.type}
          onChangeText={value => handleChange('type', value)}
        />

        <Text> </Text>
        <Button title="Add Category" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A06D78',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 2,
    marginTop: 20,
    borderColor: '#EDDBC7',
    borderRadius: 10,
    backgroundColor: 'white',
    width: '80%',
    padding: 5,
    alignSelf: 'center',
  },
  textTitle: {
    fontSize: 36,
    color: '#EDDBC7',
  },
  boxTitle: {
    fontSize: 28,
    color: '#A06D78',
    alignSelf: 'center',
    marginBottom: 6,
  },
  box: {
    width: '80%',
    backgroundColor: '#EDDBC7',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
  },
  buttonSubmit: {
    height: 50,
    width: 100,
    backgroundColor: '#A06D78',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 18,
    alignSelf: 'flex-start',
    marginTop: 12,
    marginBottom: -18,
  },
  drawerContent: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'flex-start',
  },
  buttonDashboard: {
    height: 50,
    width: 100,
    backgroundColor: '#A06D78',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default AddCategory;
