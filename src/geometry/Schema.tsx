import Schema from '@antv/g2/esm/geometry/schema';
import BaseGemo, { IBaseGemo } from './Base';
import { registerGeometry } from '../core';

registerGeometry('Schema', Schema);

interface ISchemaGemo extends IBaseGemo {}

export default class SchemaGeom extends BaseGemo<ISchemaGemo> {
  GemoBaseClassName = 'schema'
}
