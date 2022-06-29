import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { MediaLibraryPermissionResponse } from 'expo-image-picker';
import { auth } from '../../firebase';

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const goToRegister = () => navigation.navigate('Register');
  const goToChat = () => navigation.navigate('Chat');

  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      const errorMessage = error.message;
      Alert.alert(errorMessage);
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('1');
        navigation.replace('Chat');
      } else {
        navigation.canGoBack() && navigation.popToTop();
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter your email"
        label="Email"
        leftIcon={{ type: 'material', name: 'email' }}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder="Enter your password"
        label="Password"
        leftIcon={{ type: 'material', name: 'lock' }}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="sign in" style={styles.button} onPress={signIn} />
      <Button title="register" style={styles.button} onPress={goToRegister} />
      <Button title="chat" style={styles.button} onPress={goToChat} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginTop: 100,
  },
  button: {
    width: 370,
    marginTop: 10,
  },
});
export default Login;
