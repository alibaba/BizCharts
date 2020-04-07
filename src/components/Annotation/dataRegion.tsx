import Base, { IAnnotationBaseProps } from './base';

interface AnnotationDataRegionProps extends IAnnotationBaseProps {}

export default class DataRegion extends Base<AnnotationDataRegionProps>{
  public annotationType = 'data-region';
};
