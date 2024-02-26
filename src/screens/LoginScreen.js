import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { loginUser } from '../redux/slices/authSlice';
import { useNavigation } from '@react-navigation/native';

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

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Using the hook to access navigation
  const { isAuthenticated, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace('Home'); // Use 'replace' to prevent going back to login screen
    }
  }, [isAuthenticated, navigation]);

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  return (
    <Container>
      <Title>Login</Title>
      <Input
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      <Button onPress={handleLogin} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <ButtonText>Sign In</ButtonText>
        )}
      </Button>
      {error && (
        <Text style={{ color: 'red', textAlign: 'center' }}>
          {typeof error === 'string' ? error : error.message || 'An error occurred. Please try again.'}
        </Text>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <LinkText>Don't have an account? Register</LinkText>
      </TouchableOpacity>
    </Container>
  );
};

export default LoginScreen;