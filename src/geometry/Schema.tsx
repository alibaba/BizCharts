import Schema from '@antv/g2/lib/geometry/schema';
import BaseGemo, { IBaseGemoProps } from './Base';
import { registerGeometry } from '../core';
import '@antv/g2/lib/geometry/shape/schema';
import '@antv/g2/lib/geometry/shape/schema/candle';
import '@antv/g2/lib/geometry/shape/schema/box';

registerGeometry('Schema', Schema);

export interface ISchemaGemoProps extends IBaseGemoProps {}

export default class SchemaGeom extends BaseGemo<ISchemaGemoProps> {
  GemoBaseClassName = 'schema'
}
