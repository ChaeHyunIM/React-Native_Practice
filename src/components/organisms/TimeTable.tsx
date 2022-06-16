import * as React from 'react';
import { createRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';
import { LongPressGestureHandler, ScrollView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

const boxColor = '#52576222';

const TimeText = styled.Text`
  font-family: 'suit-bold'
  font-size: 14px
`;


const dummyData = Array(168).fill(0);


const TimeTable = () => {
  const [parentWidth, setParentWidth] = useState(0);
  const [num, setNum] = useState(0);
  const [data, setData] = useState(dummyData);
  const onLayout = event => {
    const { width } = event.nativeEvent.layout;
    setParentWidth(width);
  };

  const size = parentWidth / 7;
  const width = size;
  const height = size;
  const borderRadius = size * 0.2;


  const startIndex = useSharedValue(0);
  const endIndex = useSharedValue(0);
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
  const isLongPressed = useSharedValue(false);






  const Box = ({ size = 44, innerText = '', index = 0, ...props }) => {
    // const [selected, setSelected] = useState(false);
    const col = index % 7 - 1;
    const row = Math.floor(index / 7);
    const selfPosition = `[${row},${col}]`;

    const animatedStyles = useAnimatedStyle(() => {
      if (isLongPressed.value) {
        runOnJS(Haptics.selectionAsync)();
      }
      const isSelected = index <= endIndex.value && index >= startIndex.value;
      const isStart = index === startIndex.value;
      const isEnd = index === endIndex.value;

      return {
        width, height,
        borderRadius,
        transform: [
          // { translateX: offset.value.x },
          // { translateY: offset.value.y },
          { scale: withSpring(isSelected ? 1.2 : 1) },
        ],
        backgroundColor: index < endIndex.value && index > startIndex.value ? 'gray' : '#FFF',

      };
    });


    return (
      <Animated.View style={[animatedStyles]}>
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TimeText>
            {/* {innerText} */}
            {col !== -1 ? selfPosition : row.toString().padStart(2, '0')}
          </TimeText>
        </View>
      </Animated.View>


    );
  };

  const longPressGestureHandler = createRef();


  return (
    <LongPressGestureHandler
      ref={longPressGestureHandler} maxDist={4000}
      onActivated={(e) => {
        isLongPressed.value = true;
        startIndex.value = (Math.floor((e.nativeEvent.y) / size) * 7 + Math.floor(e.nativeEvent.x / size));
      }}
      onGestureEvent={(e) => {
        endIndex.value = (Math.floor((e.nativeEvent.y) / size) * 7 + Math.floor(e.nativeEvent.x / size));
      }}
      onEnded={() => {
        isLongPressed.value = false;
      }}
    >
      <ScrollView style={{ width: '100%' }}
                  onLayout={onLayout}
                  contentContainerStyle={{ justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap' }}
      >

        {dummyData.map((el, index) => {

          return <Box key={`_time_component_${index}`}
                      index={index}
                      innerText={`${parseInt(String(index / 7), 10).toString().padStart(2, '0')}`}
          />;
        })}

      </ScrollView>
    </LongPressGestureHandler>


  );
};

export default TimeTable;

const styles = StyleSheet.create({
  rowItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});