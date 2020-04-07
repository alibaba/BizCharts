import Base, { IAnnotationBaseProps } from './base';

export interface AnnotationArcProps extends IAnnotationBaseProps {}

export default class Arc extends Base<AnnotationArcProps>{
  public annotationType = 'arc';
};
