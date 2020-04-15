import React from 'react';
import Coordinate from './index';
import warn from '@/utils/warning';

export default function Coord(props) {
  warn(false, 'Coord (协调) 组件将重命名为更加语义化的组件名 Coordinate（坐标）,请使用Coordinate替代，我们将在4.1后删除Coord组件');
  return <Coordinate {...props} />
}
