import * as React from 'react';
import { Pressable, View } from 'react-native';

const Box = ({ size = 44, ...props }) => {
  const width = size;
  const height = size;
  const borderRadius = size * 0.2;
  return (
    <Pressable>
      <View>

      </View>
    </Pressable>
  );
};

export default Box;
