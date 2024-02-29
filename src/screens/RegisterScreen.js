import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser, fetchUserProfile } from '../redux/slices/authSlice';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    // Dispatch the registerUser action with the necessary data
    dispatch(registerUser({ email, password }))
      .unwrap()
      .then(async () => {
        console.log('Registration successful');
        try {
          const actionResult = await dispatch(loginUser({ email, password }));
          if (loginUser.fulfilled.match(actionResult)) {
            // After successful login, fetch user profile
            dispatch(fetchUserProfile());
          } else {
            // Handle login error
            console.error("Login failed");
          }
        } catch (error) {
          console.error("An error occurred during login", error);
        }
        // navigation.navigate('Login'); // Navigate to login screen upon successful registration
      })
      .catch((error) => {
        console.error('Registration error', error);
        alert('Registration failed.'); // Display error message
      });
  };

  return (
    <Container>
      <Title>Register</Title>
      <Input
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Input
        placeholder="Password"
        secureTextEntry
        textContentType="oneTimeCode" // or "none"
        value={password}
        onChangeText={setPassword}
      />
      <Input
        placeholder="Confirm Password"
        secureTextEntry
        textContentType="oneTimeCode" // or "none"
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

// Styled components
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
