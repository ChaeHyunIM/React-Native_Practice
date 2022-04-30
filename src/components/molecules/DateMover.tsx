import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components/native';
import PreviousDateButton from '../atom/PreviousDateButton';
import NextDateButton from '../atom/NextDateButton';
import { currentDateState } from '../../store/atoms';
import { currentDateTextSelector } from '../../store/selector';


const CustomText = styled.Text`
  font-family: 'suit-bold';
  font-size: 18px
`;

const DateMover = () => {
  const setCurrentDate = useSetRecoilState(currentDateState);
  const currentDateText = useRecoilValue(currentDateTextSelector);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <PreviousDateButton />
      <Pressable style={{ paddingHorizontal: 10 }}>
        {({ pressed }) => (
          <CustomText>
            {currentDateText}
          </CustomText>
        )}
      </Pressable>
      <NextDateButton />
    </View>
  );
};

export default DateMover;