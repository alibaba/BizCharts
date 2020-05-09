import Base, { IAnnotationBaseProps } from './base';
import { TextOption } from '../../interface';

interface AnnotationTextProps extends TextOption, IAnnotationBaseProps {}

export default class Text extends Base<AnnotationTextProps>{
  protected annotationType = 'text';
};
