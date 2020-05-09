import Base, { IAnnotationBaseProps } from './base';
import { ImageOption } from '../../interface';

interface AnnotationImageProps extends ImageOption, IAnnotationBaseProps {}

export default class image extends Base<AnnotationImageProps>{
  public annotationType = 'image';
};
