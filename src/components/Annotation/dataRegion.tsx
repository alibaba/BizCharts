import Base, { IAnnotationBaseProps } from './base';
import { DataRegionOption } from '../../interface';

interface AnnotationDataRegionProps extends DataRegionOption, IAnnotationBaseProps {}

export default class DataRegion extends Base<AnnotationDataRegionProps>{
  public annotationType = 'dataRegion';
};
