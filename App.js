import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';
import LoginScreen from './src/screens/Login';
import Register from './src/screens/Register';
import Chat from './src/screens/Chat';

const Stack = createNativeStackNavigator();
function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}
export default App;
