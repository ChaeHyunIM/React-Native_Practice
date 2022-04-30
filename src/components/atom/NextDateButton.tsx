import * as React from 'react';
import { Pressable } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

const NextDateButtonSVG = (props) => (
  <Svg
    width={22}
    height={20}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Rect
      width={20.772}
      height={18.825}
      rx={5.193}
      transform='matrix(-1 0 0 1 21.428 .651)'
      fill='#C4C4C4'
    />
    <Path
      opacity={0.5}
      d='M14.178 10.595a.65.65 0 0 0 0-1.063l-5.036-3.53a.65.65 0 0 0-1.021.53v7.062a.65.65 0 0 0 1.021.532l5.036-3.531Z'
      fill='#353538'
    />
  </Svg>
);

/**
 * @param {number} width 너비
 * @param {number} height 길이
 * @param props props들은 그대로 Pressable에 전달됩니다.
 * @constructor
 */
const NextDateButton = ({ width = 21, height = 19, ...props }) => {
  return <Pressable {...props}  >
    <NextDateButtonSVG width={width} height={height} />
  </Pressable>;
};

export default NextDateButton;


