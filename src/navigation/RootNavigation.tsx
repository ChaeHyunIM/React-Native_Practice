import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from '../screens/MainScreen';

const MainStack = createNativeStackNavigator();
const RootNavigation = () => {
  return <MainStack.Navigator>
    <MainStack.Screen name='Home' component={MainScreen} />
  </MainStack.Navigator>;
};

export default RootNavigation;