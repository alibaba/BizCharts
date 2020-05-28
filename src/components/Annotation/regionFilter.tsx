import Base, { IAnnotationBaseProps } from './base';
import { RegionFilterOption } from '../../interface';

interface AnnotationRegionFilterProps extends RegionFilterOption, IAnnotationBaseProps {}

export default class RegionFilter extends Base<AnnotationRegionFilterProps>{
  public annotationType = 'regionFilter';
};
