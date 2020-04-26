import Base, { IAnnotationBaseProps } from './base';

interface AnnotationTextProps extends IAnnotationBaseProps {}

export default class Text extends Base<AnnotationTextProps>{
  protected annotationType = 'text';
};
