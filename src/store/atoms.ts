import { atom } from 'recoil';
import { defaultColorChip } from '../styles/globalStyles';

export const userState = atom({
  key: 'userState',
  default: {},
});

export const currentDateState = atom({
  key: 'currentDateState',
  default: new Date(),
});

export const tasksForCurrentDate = atom({
  key: 'tasksForCurrentDate',
  default: [],
});

// 기본테마인지, 커스텀 테마인지 설정.
// TODO: 향후에 effect로 유저 정보에서 colorChip 가져오기
export const colorChipState = atom({
  key: 'colorChipState',
  default: defaultColorChip,
});
