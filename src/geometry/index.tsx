import BaseGemo, { IBaseGemo } from './Base';
import Area from '@antv/g2/esm/geometry/area';
import uniqueId from '@antv/util/lib/unique-id';
import { registerGeometry } from '../core';

registerGeometry('Area', Area);

interface IGemo extends IBaseGemo {
  type: string;
}

export default class AreaGeom extends BaseGemo<IGemo> {
  GemoBaseClassName = '';
  initInstance() {
    const chart = this.props['chart'] || this.props['view'];
    this.id = uniqueId(this.name);
    const options = this.getInitalConfig();
    this.g2Instance = chart[this.props.type](options);
  }
}
