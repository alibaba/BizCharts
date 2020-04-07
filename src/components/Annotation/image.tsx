import Base, { IAnnotationBaseProps } from './base';

interface AnnotationImageProps extends IAnnotationBaseProps {}

export default class image extends Base<AnnotationImageProps>{
  public annotationType = 'image';
};
