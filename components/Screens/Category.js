import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/inventory/api/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleDelete = (categoryId) => {
    axios.delete(`http://localhost:8000/api/v1/inventory/api/categories/${categoryId}/`)
      .then(response => {
        // Filter out the deleted category from the state
        setCategories(categories.filter(category => category.id !== categoryId));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryItem}>
      <Text style={styles.categoryId}>{item.id}</Text>
      <Text style={styles.categoryType}>{item.type}</Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Category List</Text>
      <View style={styles.table}>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>Category #</Text>
          <Text style={styles.headerCell}>Type</Text>
          <Text style={styles.headerCell}>Actions</Text>
        </View>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id.toString()}
          style={styles.categoryList}
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
  categoryList: {
    width: '100%',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#EDDBC7',
    borderRadius: 5,
  },
  categoryId: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryType: {
    flex: 1,
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#A06D78',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#EDDBC7',
  },
});

export default Category;
