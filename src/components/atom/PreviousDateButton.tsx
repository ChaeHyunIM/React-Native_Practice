import * as React from 'react';
import { Pressable } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

const PreviousDateButtonSVG = (props) => (
  <Svg
    width={22}
    height={20}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Rect
      x={0.789}
      y={0.651}
      width={20.772}
      height={18.825}
      rx={5.193}
      fill='#C4C4C4'
    />
    <Path
      opacity={0.5}
      d='M8.038 10.595a.65.65 0 0 1 0-1.063l5.036-3.53a.65.65 0 0 1 1.022.53v7.062a.65.65 0 0 1-1.022.532l-5.036-3.531Z'
      fill='#353538'
    />
  </Svg>
);

const PreviousDateButton = ({ width = 21, height = 19, ...props }) => {
  return <Pressable {...props}  >
    <PreviousDateButtonSVG width={width} height={height} />
  </Pressable>;
};

export default PreviousDateButton;