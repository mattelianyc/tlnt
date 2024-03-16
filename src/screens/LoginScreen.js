import React, { useState } from 'react';
import { TouchableOpacity, ActivityIndicator, Switch } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { loginUser, fetchUserProfile } from '../redux/slices/authSlice';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isTalent, setIsTalent] = useState(false);

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ email, password, isTalent }));
      dispatch(fetchUserProfile());
    } catch (error) {
      console.error("An error occurred during login", error);
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <Input
        placeholder="Email"
        placeholderTextColor="#fff"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Input
        placeholder="Password"
        placeholderTextColor="#fff"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button onPress={handleLogin}>
        <ButtonText>Sign In</ButtonText>
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <LinkText>Don't have an account? Register</LinkText>
      </TouchableOpacity>
    </Container>
  );
};

export default LoginScreen;

// Styled components
const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
  background-color: black;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  margin-bottom: 10px;
  border-width: 1px;
  padding: 10px;
  border-radius: 5px;
  color: white;
  border-color: white;
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

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const LabelText = styled.Text`
  color: white;
  font-size: 16px;
`;
