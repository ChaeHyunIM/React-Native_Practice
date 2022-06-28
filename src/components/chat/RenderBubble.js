import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Bubble, Avatar } from 'react-native-gifted-chat';
import ExpoFastImage from 'expo-fast-image';
import { auth, storageRef } from '../../../firebase';

function RenderBubble({ props }) {
  const { image } = props.currentMessage;
  // eslint-disable-next-line no-underscore-dangle
  const uid = props.currentMessage.user._id;
  const [selectedImage, setSelectedImage] = useState({
    type: '',
    url: '',
  });
  const [loading, setLoading] = useState(false);
  const [thumbs, setThumbs] = useState('');

  useEffect(() => {
    getThumbs();
  }, []);

  const getThumbs = useCallback(() => {
    if (image.includes('https://')) {
      setLoading(true);

      getDownloadChatImageUrlFromStoredUrlApi(image).then((res) => {
        if (res) {
          setThumbs(res);
          return setLoading(false);
        }
      });
    } else if (image.includes('file://')) {
      setThumbs(image);
    } else {
      // setThumbs('this is video');
    }
    return thumbs;
  }, []);

  const getDownloadChatImageUrlFromStoredUrlApi = async (storedUrl) => {
    const [fileName] = storedUrl
      .split('chat%2F')[1]
      .split('?alt=')[0]
      .split('%2F');

    const imageRef = storageRef.child(`chat/${fileName}`);
    const downloadUrl = await imageRef.getDownloadURL();

    return downloadUrl;
  };

  const renderImage = () => {
    if (!loading) {
      return (
        <TouchableOpacity
          onPress={() => {
            setSelectedImage({
              type: 'image',
              url: image,
            });
          }}
        >
          <ExpoFastImage
            style={styles.bubbleImage}
            source={{ uri: thumbs }}
            cacheKey="unique key"
          />
        </TouchableOpacity>
      );
    }
    return (
      <ActivityIndicator
        size="large"
        style={{ paddingVertical: 57, paddingHorizontal: 82 }}
      />
    );
  };

  return (
    <Bubble
      {...props}
      position={auth?.currentUser.uid === uid ? 'right' : 'left'}
      renderMessageImage={renderImage}
      textStyle={{
        left: { color: '#fff' },
        right: { color: '#fff' },
      }}
      wrapperStyle={{
        right: {
          backgroundColor: '#fca903',
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 15,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
        left: {
          backgroundColor: '#b103fc',
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
      }}
    />
  );
}

export default RenderBubble;

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
