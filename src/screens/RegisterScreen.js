import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Switch } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser, fetchUserProfile } from '../redux/slices/authSlice';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('regular');
  const dispatch = useDispatch();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    // Include the userType in your registration logic
    dispatch(registerUser({ email, password, userType }))
      .unwrap()
      .then(async () => {
        console.log('Registration successful');
        try {
          const actionResult = await dispatch(loginUser({ email, password }));
          if (loginUser.fulfilled.match(actionResult)) {
            dispatch(fetchUserProfile());
          } else {
            console.error("Login failed");
          }
        } catch (error) {
          console.error("An error occurred during login", error);
        }
      })
      .catch((error) => {
        console.error('Registration error', error);
        alert('Registration failed.');
      });
  };

  return (
    <Container>
      <Title>Register</Title>
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
        textContentType="oneTimeCode"
        value={password}
        onChangeText={setPassword}
      />
      <Input
        placeholder="Confirm Password"
        placeholderTextColor="#fff"
        secureTextEntry
        textContentType="oneTimeCode"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Row>
        <LabelText>Register as Talent:</LabelText>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={userType === "talent" ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={(newValue) => setUserType(newValue ? "talent" : "regular")}
          value={userType === "talent"}
        />
      </Row>
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

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
  background-color: black; 
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: white; 
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
