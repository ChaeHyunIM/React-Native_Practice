import React, {
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';
import { db, auth } from '../../firebase';

function Chat({ navigation }) {
  const [messages, setMessages] = useState([]);
  // const userInfo = useRecoilValue(userState);
  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        navigation.replace('Login');
      })
      .catch((error) => {
        // An error happened.
      });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginLeft: 10 }}>
          <Avatar
            rounded
            source={{
              uri: auth?.currentUser?.photoURL,
            }}
          />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={signOut}
        >
          <Text>logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ]);
  // }, []);

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection('chats')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          })),
        ),
      );
    return unsubscribe;
  }, []);

  // const onSend = useCallback(async (messages = []) => {
  //   setMessages((previousMessages) =>
  //     GiftedChat.append(previousMessages, messages),
  //   );
  //   const { _id, createdAt, text, user } = messages[0];
  //   console.log(messages);
  //   const docRef = await addDoc(collection(db, 'chats'), {
  //     id: _id,
  //     createdAt,
  //     text,
  //     // user,
  //   })
  //     .then((docRef) => {
  //       console.log('Document written with ID:', docRef.id);
  //     })
  //     .catch((error) => {
  //       console.error('Error adding document: ', error);
  //     });

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
    const { _id, createdAt, text, user } = messages[0];
    db.collection('chats')
      .add({ _id, createdAt, text, user })
      .then((docRef) => {
        console.log('Document written with ID:', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar:
          auth?.currentUser?.photoURL ||
          'https://media.nature.com/w1248/magazine-assets/d41586-021-03080-7/d41586-021-03080-7_19837260.jpg',
      }}
    />
  );
}
const styles = StyleSheet.create({});
export default Chat;
