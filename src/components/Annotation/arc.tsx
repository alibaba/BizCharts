import Base, { AnnotationBaseProps } from './base';

export interface AnnotationArcProps extends AnnotationBaseProps {}

export default class Arc extends Base<AnnotationArcProps>{
  public annotationType = 'arc';
};
