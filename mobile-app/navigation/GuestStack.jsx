import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { Login, Register } from '../constants/RouteConstants';

const Stack = createStackNavigator();

const GuestStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#F0F9FF' },
        }}
      >
        <Stack.Screen
          name={Login}
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name={Register}
          options={{ headerShown: false }}
          component={RegisterScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default GuestStack;
