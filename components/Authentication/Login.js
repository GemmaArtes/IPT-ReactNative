import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = data;

  const [error, setError] = useState('');

  const handleUsernameChange = (text) => {
    setData({ ...data, username: text });
  };

  const handlePasswordChange = (text) => {
    setData({ ...data, password: text });
  };

  const handleSubmit = () => {
    axios
      .post('http://192.168.43.37:8000/api/v1/accounts/token/login', data, {})
      .then((response) => {
        setData({
          username: '',
          password: '',
        });
        setError('');
        AsyncStorage.setItem("token", JSON.stringify(response.data.auth_token));
        navigation.navigate('Home');
      })
      .catch((error) => {
        if (error.response) {
          // The server responded with a status code
          console.log('Server Error:', error.response.data);
          setError('Invalid Credentials!');
        } else if (error.request) {
          // The request was made but no response was received
          console.log('Network Error:', error.request);
          setError('Network Error! Please check your connection.');
        } else {
          // Something else happened during the request
          console.log('Error:', error.message);
          setError('An unexpected error occurred.');
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Inventory System</Text>
      <View style={styles.box}>
        <Text style={styles.boxTitle}>Welcome Back!</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={handleUsernameChange}
        />

        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={handlePasswordChange}
        />

        <TouchableOpacity style={styles.buttonLogin} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSignup}
          onPress={() => navigation.navigate('Registration')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.errorText}>{error}</Text>
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
  textTitle: {
    fontSize: 36,
    color: '#EDDBC7',
  },
  box: {
    width: '80%',
    backgroundColor: '#EDDBC7',
    borderRadius: 20,
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
  boxTitle: {
    fontSize: 28,
    color: '#A06D78',
    alignSelf: 'center',
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
  buttonLogin: {
    height: 50,
    width: 100,
    backgroundColor: '#A06D78',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonSignup: {
    height: 50,
    width: 100,
    backgroundColor: '#A06D78',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: '#EDDBC7',
  },
  errorText: {
    color: 'red',
  },
});

export default Login;
