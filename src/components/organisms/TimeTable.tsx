import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';

type Item = {
  key: string;
  label: string;
  height: number;
  width: number;
  backgroundColor: string;
};

const TimeText = styled.Text`
  font-family: 'suit-bold', sans-serif;
  font-size: 14px
`;

const Box = ({ size = 44, innerText = '', backgroundColor = '#fff', index = 0, ...props }) => {
  const [selected, setSelected] = useState(false);
  const width = size;
  const height = size;
  const borderRadius = size * 0.2;
  return (
    <View style={{ width, height, padding: size * 0.02 }}>
      <View
        style={{
          backgroundColor: selected ? '#000' : backgroundColor,
          width: '100%',
          height: '100%',
          borderRadius,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TimeText>
          {innerText}
        </TimeText>
      </View>
    </View>

  );
};

const dummyData = Array(168).fill(0).map((el, i) => ({ label: `${i}`, backgroundColor: '#fff' }));


const TimeTable = () => {
  const [parentWidth, setParentWidth] = useState(0);
  const [data, setData] = useState(dummyData);
  const onLayout = event => {
    const { width } = event.nativeEvent.layout;
    setParentWidth(width);
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => {
    const size = parentWidth / 7;
    const width = size;
    const height = size;
    const borderRadius = size * 0.2;
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.rowItem,
            { backgroundColor: isActive ? 'red' : '#fff' },
            { width, height, borderRadius },
          ]}
        >
          <Text style={styles.text}>{item.label}</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };


  return (
    <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}
          onLayout={onLayout}>
      <DraggableFlatList
        numColumns={7}
        data={data}
        onDragEnd={({ data }) => setData(data)}
        directionalLockEnabled
        keyExtractor={(item, index) => `${JSON.stringify(item)}_${index}`}
        disableScrollViewPanResponder
        renderItem={renderItem}
        // renderItem={({ item, index }) => (
        //   <Box size={parentWidth / 7}
        //        innerText={`${parseInt(String(index / 7), 10).toString().padStart(2, '0')}`}
        //        backgroundColor='#52576222' />)}
      />

    </View>
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