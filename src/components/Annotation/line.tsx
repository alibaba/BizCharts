import Base, { IAnnotationBaseProps } from './base';

interface AnnotationLineProps extends IAnnotationBaseProps {}

export default class Line extends Base<AnnotationLineProps>{
  public annotationType = 'line';
};
