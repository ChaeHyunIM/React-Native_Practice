import { atom } from 'recoil';

export const userIdState = atom({
  key: 'userIdState',
  default: '',
});

export const currentDateState = atom({
  key: 'currentDateState',
  default: new Date(),
});

export const tasksForCurrentDate = atom({
  key: 'tasksForCurrentDate',
  default: [],
});