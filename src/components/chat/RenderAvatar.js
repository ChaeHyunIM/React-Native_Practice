import React from 'react';
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-gifted-chat';
import { auth } from '../../../firebase';

function RenderAvatar({ props }) {
  const uid = props.currentMessage.user._id;
  const userName = props.currentMessage.user.name;
  if (auth?.currentUser.uid !== uid) {
    return (
      <View>
        <Avatar {...props} />
        <Text style={{ textAlign: 'center' }}>{userName}</Text>
      </View>
    );
  }
  if (auth?.currentUser.uid === uid) {
    return null;
  }
}

export default RenderAvatar;
