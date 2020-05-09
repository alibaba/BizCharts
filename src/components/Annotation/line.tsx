import Base, { IAnnotationBaseProps } from './base';
import { LineOption } from '../../interface';

interface AnnotationLineProps extends LineOption,IAnnotationBaseProps {}

export default class Line extends Base<AnnotationLineProps>{
  public annotationType = 'line';
};
