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
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    quantity: '',
    price: '',
    category: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/v1/inventory/api/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    axios
      .post('http://localhost:8000/api/v1/inventory/api/products/', formData)
      .then(response => {
        alert('Product added successfully!');
        setFormData({
          code: '',
          name: '',
          quantity: '',
          price: '',
          category: '',
        });
      })
      .catch(error => {
        alert('Ensure that the Code value is less than or equal to 1000!');
      });
  };

  return (
    <DrawerLayoutAndroid
      drawerWidth={200}
      drawerPosition={'left'}
      renderNavigationView={() => (
        <View style={styles.drawerContent}>
          <Text style={{ color: 'white', marginTop: 40, fontSize: 28 }}>
            Dashboard
          </Text>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.buttonDashboard}
              onPress={() => {
                navigation.navigate('Home');
              }}
            >
              <Text style={{ color: '#EDDBC7' }}>Home</Text>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.buttonDashboard}
              onPress={() => {
                navigation.navigate('Products');
              }}
            >
              <Text style={{ color: '#EDDBC7' }}>Products</Text>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.buttonDashboard}
              onPress={() => {
                navigation.navigate('Categories');
              }}
            >
              <Text style={{ color: '#EDDBC7' }}>Categories</Text>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.buttonDashboard}
              onPress={() => {
                navigation.navigate('AddProduct');
              }}
            >
              <Text style={{ color: '#EDDBC7' }}>Add Product</Text>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.buttonDashboard}
              onPress={() => {
                navigation.navigate('AddCategory');
              }}
            >
              <Text style={{ color: '#EDDBC7' }}>Add Category</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    >
      <View style={styles.container}>
        <Text style={styles.textTitle}>Inventory System</Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <View style={styles.box}>
          <Text> </Text>
          <Text style={styles.boxTitle}>Add New Product</Text>

          <Text style={styles.inputLabel}>Product Code:</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            value={formData.code}
            onChangeText={value => handleChange('code', value)}
          />
          <Text style={styles.inputLabel}>Name:</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={value => handleChange('name', value)}
          />
          <Text style={styles.inputLabel}>Quantity:</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            value={formData.quantity}
            onChangeText={value => handleChange('quantity', value)}
          />
          <Text style={styles.inputLabel}>Price:</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            value={formData.price}
            onChangeText={value => handleChange('price', value)}
          />
          <Text style={styles.inputLabel2}>Category:</Text>
          <Picker
            selectedValue={formData.category}
            style={styles.picker}
            onValueChange={value => handleChange('category', value)}
          >
            <Picker.Item label="Select a Category" value="" />
            {categories.map(category => (
              <Picker.Item
                key={category.id}
                label={category.type}
                value={category.id}
              />
            ))}
          </Picker>

          <Text> </Text>
          <Button title="Add Product" onPress={handleSubmit} />
        </View>
      </View>
    </DrawerLayoutAndroid>
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
  inputLabel2: {
    fontSize: 18,
    alignSelf: 'flex-start',
    marginTop: 12,
    marginBottom: 6,
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

export default AddProduct;
