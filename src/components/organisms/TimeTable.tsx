import * as React from 'react';
import { createRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';
import { Gesture, LongPressGestureHandler, ScrollView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
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


  const longPress = Gesture.LongPress()
    .onStart(e => {
      isLongPressed.value = true;
    });


  const dragGesture = Gesture.Pan()
    .simultaneousWithExternalGesture(longPress)
    .manualActivation(true)
    .onTouchesMove((event, stateManager) => {
      if (isLongPressed.value) {
        stateManager.activate();
      } else {
        stateManager.fail();
      }
    })
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
      endIndex.value = (Math.floor((e.y) / size) * 7 + Math.floor(e.x / size));

    })
    // .onEnd((e) => {
    //   start.value = {
    //     x: offset.value.x,
    //     y: offset.value.y,
    //   };
    // })
    .onTouchesUp((e) => {
      endIndex.value = (Math.floor((e.y) / size) * 7 + Math.floor(e.x / size));
      setNum(endIndex.value);
      isLongPressed.value = false;
    });
  // .onFinalize(() => {
  //   isPressed.value = false;
  //   // startIndex.value=0
  // });

  const composed = Gesture.Simultaneous(dragGesture, longPress);

  const Box = ({ size = 44, innerText = '', index = 0, ...props }) => {
    // const [selected, setSelected] = useState(false);
    const col = index % 7 - 1;
    const row = Math.floor(index / 7);
    const selfPosition = `[${row},${col}]`;

    const animatedStyles = useAnimatedStyle(() => {
      runOnJS(Haptics.selectionAsync)();
      return {
        width, height, borderRadius,
        transform: [
          // { translateX: offset.value.x },
          // { translateY: offset.value.y },
          // { scale: withSpring(isPressed.value ? 1.2 : 1) },
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

  const panGestureHandlerRef = createRef();
  const longPressGestureHandler = createRef();


  return (
    <LongPressGestureHandler
      ref={longPressGestureHandler} maxDist={4000}
      onActivated={(e) => {
        startIndex.value = (Math.floor((e.nativeEvent.y) / size) * 7 + Math.floor(e.nativeEvent.x / size));

      }}
      onGestureEvent={(e) => {
        endIndex.value = (Math.floor((e.nativeEvent.y) / size) * 7 + Math.floor(e.nativeEvent.x / size));
      }}>
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