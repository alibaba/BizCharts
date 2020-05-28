import Base, { IAnnotationBaseProps } from './base';
import { DataMarkerOption } from '../../interface';

interface AnnotationDataMarkerProps extends DataMarkerOption, IAnnotationBaseProps {}

export default class DataMarker extends Base<AnnotationDataMarkerProps>{
  public annotationType = 'dataMarker';
};
