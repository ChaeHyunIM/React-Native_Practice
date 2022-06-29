import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useRecoilState, RecoilRoot } from 'recoil';
import { auth, db } from '../../firebase';
import { userState } from '../store/atoms';

function Register({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userInfo, setUserInfo] = useRecoilState(userState);

  // const sendUserInfo = async () => {
  //   const { displayName, email, photoURL, uid } = userInfo;
  //   await db.collection('users_ch').add({ displayName, email, photoURL, uid });
  // };

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        user
          .updateProfile({
            email,
            displayName: name,
            photoURL:
              avatar ||
              'https://media.nature.com/w1248/magazine-assets/d41586-021-03080-7/d41586-021-03080-7_19837260.jpg',
          })
          // .then(async () => {
          //   setUserInfo(user);
          //   const { displayName, email, photoURL, uid } = userInfo;
          //   await db
          //     .collection('users_ch')
          //     .add({ displayName, photoURL })
          //     .then((docRef) => {
          //       console.log('Document written with ID:', docRef.id);
          //     })
          //     .catch((error) => {
          //       console.error('Error adding document: ', error);
          //     });
          // })
          .catch((error) => {
            console.log(`errorMessage1: ${error.message}`);
          });
        navigation.popToTop();
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(`errorMessage2: ${errorMessage}`);
      });
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter your name"
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Input
        placeholder="Enter your email"
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder="Enter your password"
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Input
        placeholder="Enter your image url"
        label="Profile Picture"
        value={avatar}
        onChangeText={(text) => setAvatar(text)}
      />
      <Button title="register" style={styles.button} onPress={register} />
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
export default Register;
