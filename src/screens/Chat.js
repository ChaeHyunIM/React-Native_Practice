import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import firebase from 'firebase/compat/app';
import { IconButton } from 'react-native-paper';
import { db, auth, storageRef } from '../../firebase';
import RenderBubble from '../components/chat/RenderBubble';
import RenderAvatar from '../components/chat/RenderAvatar';

function Chat({ navigation }) {
  const [messages, setMessages] = useState([]);
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

  useEffect(() => {
    if (auth?.currentUser) {
      const unsubscribeChatMessages = db
        .collection('chats')
        .where('deleteMsg', '==', false)
        .orderBy('createdAt', 'desc')
        .onSnapshot((querySnapshot) => {
          const thread = querySnapshot.docs.map((doc) => {
            const firebaseData = doc.data();
            const dataDate = new Date(firebaseData.createdAt.seconds * 1000);
            const { text = '' } = firebaseData;
            const data = {
              ...firebaseData,
              _id: firebaseData._id,
              text,
              createdAt: dataDate,
            };

            return data;
          });

          setMessages(thread);
        });

      return () => unsubscribeChatMessages();
    }
  }, []);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: '',
  //       image:
  //         'https://firebasestorage.googleapis.com/v0/b/project-8606414551952294422.appspot.com/o/image%2F1656045699685_0_.jpg?alt=media&token=cd6f0a38-f718-48cf-9491-9d214191e1b8',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ]);
  // }, []);

  // useLayoutEffect(() => {
  //   const unsubscribe = db
  //     .collection('chats')
  //     .orderBy('createdAt', 'desc')
  //     .onSnapshot((snapshot) =>
  //       setMessages(
  //         snapshot.docs.map((doc) => ({
  //           _id: doc.data()._id,
  //           createdAt: doc.data().createdAt.toDate(),
  //           text: doc.data().text,
  //           user: doc.data().user,
  //         })),
  //       ),
  //     );
  //   return unsubscribe;
  // }, []);
  const onSend = async (localMessages = []) => {
    const { text, createdAt, _id } = localMessages[0];
    const contents = {
      _id,
      text,
      createdAt,
      user: {
        _id: auth?.currentUser.uid,
        name: auth?.currentUser?.displayName,
        avatar:
          auth?.currentUser?.photoURL ||
          'https://media.nature.com/w1248/magazine-assets/d41586-021-03080-7/d41586-021-03080-7_19837260.jpg',
      },
      assets: [],
      isReply: true,
      likeNumber: 1,
      replyTo: '',
      reportNumber: 1,
      deleteMsg: false,
      image: '',
      video: '',
      // video:
      //   'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    };

    await db.collection('chats').doc(localMessages[0]._id).set(contents);

    await db.collection('chats').doc(localMessages[0]._id).set(
      {
        latestMessage: {
          text,
          createdAt,
        },
      },
      { merge: true },
    );
    // setImage('');
  };

  const plusBtn = () => {
    return (
      <TouchableOpacity
        style={styles.plusStyle}
        activeOpacity={0.5}
        onPress={() => pickImage()}
      >
        <IconButton icon="plus-circle" size={21} color="#5587FF" />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    return async () => {
      if (Platform.OS !== 'web') {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Sorry, we need camera roll permissions to make this work',
          );
        }
      }
    };
  }, []);

  const sendImageData = async (type = '', uri = '', contents = {}) => {
    await db
      .collection('chats')
      // eslint-disable-next-line no-underscore-dangle
      .doc(contents._id)
      .set(type === 'image' ? { ...contents, image: uri } : null);
  };

  const uploadChatImageApi = async (fileName, uri, setProgress, onUpload) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const chattingStorageRef = storageRef.child(`chat/${fileName}`);

    const mainUploadTask = chattingStorageRef.put(blob);
    mainUploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            break;
          case firebase.storage.TaskState.RUNNING:
            break;
        }
      },
      (error) => {
        // console.log(error.code);
      },
      () => {
        mainUploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          onUpload(downloadURL);
        });
      },
    );
  };

  const pickImage = async () => {
    const { granted } = await MediaLibrary.requestPermissionsAsync();
    if (granted) {
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      }).then((result) => {
        // console.log(result.uri);
        if (!result.cancelled) {
          const newChatID = GiftedChat.defaultProps.messageIdGenerator();
          const contents = {
            _id: newChatID,
            text: '',
            createdAt: new Date(),
            user: {
              _id: auth?.currentUser.uid,
              name: auth?.currentUser?.displayName,
              avatar:
                auth?.currentUser?.photoURL ||
                'https://media.nature.com/w1248/magazine-assets/d41586-021-03080-7/d41586-021-03080-7_19837260.jpg',
            },
            assets: [],
            isReply: true,
            likeNumber: 1,
            replyTo: '',
            reportNumber: 1,
            deleteMsg: false,
            image: '',
            video: '',
          };
          // setImage(result.uri);

          sendImageData(result.type, result.uri, contents);
          uploadChatImageApi(
            `${new Date().getTime()}_${auth?.currentUser.uid}`,
            result.uri,
            // eslint-disable-next-line react/prop-types
            undefined,
            (downloadURL) =>
              updateFireStoreImageUrl(result.type, downloadURL, contents),
          );
          return result;
        }
        Alert.alert('Permissions required to access camera roll.');
      });
    }
  };

  const updateFireStoreImageUrl = async (
    type = '',
    downloadURL = '',
    contents = {},
  ) => {
    await db
      .collection('chats')
      .doc(contents._id)
      .set(type === 'image' ? { ...contents, image: downloadURL } : null);

    await db
      .collection('chats')
      .doc(contents._id)
      .set(
        type === 'image'
          ? { latestMessage: { text: '이미지', createdAt: contents.createdAt } }
          : null,
        { merge: true },
      );
  };
  // const uploadImage = async () => {
  //   await pickImage();
  //   const imageArr = [];
  //   const promiseArr = [];
  //   imageArr.push(imageUrl);
  //   // console.log(imageArr);
  //   for await (const [index, value] of imageArr.entries()) {
  //     // eslint-disable-next-line no-undef
  //     const response = await fetch(value.uri);
  //     const blob = await response.blob();
  //     const communityStorageRef = storageRef
  //       .child(`image/${new Date().getTime()}_${index}_.jpg`)
  //       .put(blob);
  //     // // .then((res) => console.log(res))
  //     // .catch((error) => {
  //     //   // console.log(error);
  //     // });
  //     promiseArr.push(communityStorageRef);
  //   }
  //
  //   const imageUrlPromiseAll = Promise.all(promiseArr).then(
  //     (uploadTaskSnapshotsArray) => {
  //       const promises = [];
  //       uploadTaskSnapshotsArray.forEach((uploadTaskSnapshot) => {
  //         promises.push(uploadTaskSnapshot.ref.getDownloadURL());
  //       });
  //       return Promise.all(promises);
  //     },
  //   );
  //   return imageUrlPromiseAll;
  // };

  // const getFirebaseUri = () => {
  //   uploadImage().then((res) => {
  //     console.log(res);
  //     // setImageUrl((imageUrl.uri = res));
  //     // console.log(`imageUrl:${JSON.stringify(imageUrl)}`);
  //     messages.image = res;
  //   });
  // };

  // console.log(`messages:${JSON.stringify(messages.image)}`);
  // const renderBubble = () => {
  //   return <RenderBubble uri={messages.image[0]} />;
  // };

  // const renderBubble = (messages) => {
  //   return <RenderBubble props={messages} />;
  // };

  return (
    <GiftedChat
      messages={messages}
      minComposerHeight={40}
      minInputToolbarHeight={60}
      renderBubble={(messages) => <RenderBubble props={messages} />}
      renderActions={() => plusBtn()}
      renderAvatarOnTop
      renderAvatar={(messages) => <RenderAvatar props={messages} />}
      onSend={(localMessages) => onSend(localMessages)}
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

const styles = StyleSheet.create({
  plusStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 25,
    width: 25,
    borderRadius: 5,
    marginBottom: 10,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 30,
    right: 0,
    zIndex: 1,
  },
  bubbleImage: {
    width: 200,
    height: 150,
    borderRadius: 20,
  },
  // container: {
  //   position: 'absolute',
  //   width: Dimensions.get('window').width,
  //   height: '100%',
  //   backgroundColor: '#000',
  //   zIndex: 2,
  // },
  // centeredView: {
  //   width: Dimensions.get('window').width,
  //   height: Dimensions.get('window').height * 0.5,
  //   alignSelf: 'center',
  //   top: '25%',
  // },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    zIndex: 1,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default Chat;
