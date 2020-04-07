import Base, { AnnotationBaseProps } from './base';

export interface AnnotationRegionProps extends AnnotationBaseProps {}

export default class Arc extends Base<AnnotationRegionProps>{
  public annotationType = 'region';
};
