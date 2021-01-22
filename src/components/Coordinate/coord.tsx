import React from 'react';
import warn from 'warning';
import Coordinate from './index';

export default function Coord(props) {
  warn(false, 'Coord (协调) 组件将重命名为更加语义化的组件名 Coordinate（坐标）,请使用Coordinate替代，我们将在5.0后删除Coord组件');
  return <Coordinate {...props} />
}
