import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-family: 'Moirai';
  font-weight: bold;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  margin-bottom: 10px;
  border-width: 1px;
  padding: 10px;
  border-radius: 5px;
`;

const Button = styled.TouchableOpacity`
  background-color: blue;
  padding: 15px;
  border-radius: 5px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

const LinkText = styled.Text`
  margin-top: 20px;
  color: blue;
  text-align: center;
`;

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    try {
      const response = await axios.post('YOUR_API_ENDPOINT/register', {
        email,
        password,
      });
      // Handle response, e.g., navigate to login screen, show success message
      console.log('Registration successful', response.data);
      navigation.navigate('Login');
    } catch (error) {
      // Handle error, e.g., show error message
      console.error('Registration error', error);
      alert('Registration failed.');
    }
  };

  return (
    <Container>
      <Title>Register</Title>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Input
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button onPress={handleRegister}>
        <ButtonText>Register</ButtonText>
      </Button>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <LinkText>Already have an account? Sign In</LinkText>
      </TouchableOpacity>
    </Container>
  );
};

export default RegisterScreen;
