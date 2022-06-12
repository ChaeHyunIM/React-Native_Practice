import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components/native';
import PreviousDateButton from '../atom/PreviousDateButton';
import NextDateButton from '../atom/NextDateButton';
import { currentDateState } from '../../store/atoms';
import { currentDateTextSelector } from '../../store/selector';


const CustomText = styled.Text`
  font-family: 'suit-bold';
  font-size: 20px
`;
const dayToMilliseconds = 24 * 3600 * 1000;
const DateHeader = () => {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  const currentDateText = useRecoilValue(currentDateTextSelector);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
      <PreviousDateButton
        hitSlop={10}
        onPress={() => {
          setCurrentDate(new Date(currentDate.getTime() - dayToMilliseconds));
        }} />
      <Pressable style={{ paddingHorizontal: 10 }}>
        {({ pressed }) => (
          <CustomText>
            {currentDateText}
          </CustomText>
        )}
      </Pressable>

      <NextDateButton hitSlop={10} onPress={() => {
        setCurrentDate(new Date(currentDate.getTime() + dayToMilliseconds));
      }} />
    </View>
  );
};

export default DateHeader;