import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const Register = () => {
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const [errorfirstname, setErrorfirstname] = useState('');
  const [errorlastname, setErrorlastname] = useState('');
  const [erroremail, setErroremail] = useState('');
  const [errorusername, setErrorusername] = useState('');
  const [errorpassword, setErrorpassword] = useState('');
  const [errorconfirmpassword, setErrorconfirmpassword] = useState('');
  const [errorbothpassword, setErrorbothpassword] = useState('');
  const [success, setSuccess] = useState('');
  const [msg, setMsg] = useState('');

  const isValidEmail = (value) => {
    const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return regx.test(value);
  };

  const isPasswordValid = (value) => {
    const regx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    return regx.test(value);
  };

  const formValidation = () => {
    if (!data.first_name.trim() || data.first_name.length < 3) {
      setErrorfirstname('Invalid name!');
      return false;
    }
    if (!data.last_name.trim() || data.last_name.length < 3) {
      setErrorlastname('Invalid name!');
      return false;
    }
    if (!isValidEmail(data.email)) {
      setErroremail('Invalid email!');
      return false;
    }
    if (!data.username.trim() || data.username.length < 3) {
      setErrorusername('Invalid username!');
      return false;
    }
    if (!isPasswordValid(data.password)) {
      setErrorpassword('Invalid Password must contain: Atleast one digit and special character, 8 to 16 characters!');
      return false;
    }
    if (!isPasswordValid(data.confirm_password)) {
      setErrorconfirmpassword('Invalid Password must contain: Atleast one digit and special character, 8 to 16 characters!');
      return false;
    }
    if (data.password !== data.confirm_password) {
      setErrorbothpassword('Password does not match!');
      return false;
    }
    return true;
  };

  const submit = () => {
    if (data.first_name.trim() || data.first_name.length >= 3) {
      setErrorfirstname('');
    }
    if (data.last_name.trim() || data.last_name.length >= 3) {
      setErrorlastname('');
    }

    if (data.username.trim() || data.username.length >= 11) {
      setErrorusername('');
    }
    if (isValidEmail(data.email)) {
      setErroremail('');
    }
    if (isPasswordValid(data.password)) {
      setErrorpassword('');
    }
    if (isPasswordValid(data.confirm_password)) {
      setErrorconfirmpassword('');
    }
    if (data.password === data.confirm_password) {
      setErrorbothpassword('');
    }
    if (formValidation()) {
      axios.post('http://localhost:8000/api/v1/accounts/users/', data, {})
        .then((response) => {
          console.log(response.data);
          setData({
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            confirm_password: '',
          });
          setSuccess('Registered Successfully! Please check your email for activation!');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.regtxt}>REGISTRATION</Text>
        {success ? (
          <Text style={styles.succescolor}>{success}</Text>
        ) : null}
        <View style={styles.names}>
          <Text style={styles.em}>First Name</Text>
          <View style={styles.column}>
            <TextInput
              style={styles.regfull}
              value={data.first_name}
              onChangeText={(text) => setData({ ...data, first_name: text })}
            />
            {errorfirstname ? (
              <Text style={[styles.msgcolor, styles.errorposition]}>{errorfirstname}</Text>
            ) : null}
          </View>

          <Text style={styles.em}>Last Name</Text>
          <View style={styles.column}>
            <TextInput
              style={styles.regfull}
              value={data.last_name}
              onChangeText={(text) => setData({ ...data, last_name: text })}
            />
            <Text style={[styles.msgcolor, styles.errorposition]}>{errorlastname}</Text>
          </View>
        </View>
        <View style={styles.names}>
          <Text style={styles.em}>Email</Text>
          <View style={styles.column}>
            <TextInput
              style={styles.regemail}
              value={data.email}
              onChangeText={(text) => setData({ ...data, email: text })}
            />
            <Text style={[styles.msgcolor, styles.errorposition]}>{erroremail}</Text>
          </View>

          <Text style={styles.em}>Username</Text>
          <View style={styles.column}>
            <TextInput
              style={styles.reguser}
              value={data.username}
              onChangeText={(text) => setData({ ...data, username: text })}
            />
            <Text style={[styles.msgcolor, styles.error1position]}>{errorusername}</Text>
          </View>
        </View>
        <View style={styles.names}>
          <Text style={styles.em}>Password</Text>
          <TextInput
            style={styles.regpass}
            secureTextEntry={true}
            value={data.password}
            onChangeText={(text) => setData({ ...data, password: text })}
          />

          <Text style={[styles.msgcolor, styles.error1position]}>{errorpassword}</Text>
          <Text style={[styles.msgcolor, styles.error1position]}>{errorbothpassword}</Text>

          <Text style={styles.em}>Confirm Password</Text>
          <TextInput
            style={styles.regpass}
            secureTextEntry={true}
            value={data.confirm_password}
            onChangeText={(text) => setData({ ...data, confirm_password: text })}
          />

          <Text style={[styles.msgcolor, styles.error1position]}>{errorconfirmpassword}</Text>
          <Text style={[styles.msgcolor, styles.error1position]}>{errorbothpassword}</Text>
        </View>

        <TouchableOpacity style={styles.btn} onPress={submit}>
          <Text style={styles.txt}>Submit</Text>
        </TouchableOpacity>
        <Text style={[styles.msgcolor, styles.msgposition]}>{msg}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '80%',
  },
  regtxt: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  succescolor: {
    color: 'green',
    marginBottom: 10,
  },
  names: {
    marginBottom: 20,
  },
  em: {
    fontSize: 16,
    marginBottom: 5,
  },
  column: {
    flexDirection: 'column',
  },
  regfull: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 5,
  },
  msgcolor: {
    color: 'red',
  },
  errorposition: {
    marginTop: -10,
    marginBottom: 10,
  },
  error1position: {
    marginTop: -20,
    marginBottom: 10,
  },
  regemail: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 5,
  },
  reguser: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 5,
  },
  regpass: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 5,
  },
  dyhaa: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  reg: {
    color: 'blue',
  },
  btn: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  txt: {
    color: 'white',
    fontSize: 16,
  },
  msgposition: {
    textAlign: 'center',
  },
});

export default Register;
