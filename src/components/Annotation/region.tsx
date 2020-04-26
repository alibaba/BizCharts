import Base, { IAnnotationBaseProps } from './base';

export interface AnnotationRegionProps extends IAnnotationBaseProps {}

export default class Arc extends Base<AnnotationRegionProps>{
  public annotationType = 'region';
};
