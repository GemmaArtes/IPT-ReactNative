import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/inventory/api/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    axios.get('http://localhost:8000/api/v1/inventory/api/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const getProductCategory = (categoryId) => {
    const category = categories.find(category => category.id === categoryId);
    return category ? category.type : '';
  };

  const renderProduct = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.code}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.quantity}</Text>
      <Text style={styles.cell}>{item.price}</Text>
      <Text style={styles.cell}>{getProductCategory(item.category)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product List</Text>
      <View style={styles.table}>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>Code</Text>
          <Text style={styles.headerCell}>Name</Text>
          <Text style={styles.headerCell}>Quantity</Text>
          <Text style={styles.headerCell}>Price</Text>
          <Text style={styles.headerCell}>Category</Text>
        </View>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  table: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#EDDBC7',
    borderRadius: 5,
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerCell: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cell: {
    flex: 1,
    fontSize: 16,
  },
});

export default Products;
