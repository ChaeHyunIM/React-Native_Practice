import { selector } from 'recoil';
import { colorChipState, currentDateState } from './atoms';
import { StyleSheet } from 'react-native';


export const currentDateTextSelector = selector({
  key: 'currentDateTextSelector',
  get: ({ get }) => {
    const currentDateFromAtom = get(currentDateState);
    const currentMonth = currentDateFromAtom.getMonth() + 1;
    const currentDate = currentDateFromAtom.getDate();
    return `${currentMonth}월 ${currentDate}일`;
  },
});

export const currentDateDestructuringSelector = selector({
  key: 'currentDateDestructuringSelector',
  get: ({ get }) => {
    const currentDateFromAtom = get(currentDateState);
    const currentYear = currentDateFromAtom.getFullYear();
    const currentMonth = currentDateFromAtom.getMonth() + 1;
    const currentDate = currentDateFromAtom.getDate();
    return { year: currentYear, month: currentMonth, date: currentDate };
  },
});

export const themeSelector = selector({
  key: 'themeSelector',
  get: ({ get }) => {
    const colorChip = get(colorChipState);
    return StyleSheet.create({
      background: {
        backgroundColor: colorChip.background,
      },
    });
  },
});