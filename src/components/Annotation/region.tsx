import Base, { IAnnotationBaseProps } from './base';
import { RegionOption } from '../../interface';

export interface AnnotationRegionProps extends RegionOption, IAnnotationBaseProps {}

export default class Region extends Base<AnnotationRegionProps>{
  public annotationType = 'region';
};
