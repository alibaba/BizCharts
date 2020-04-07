import Base, { IAnnotationBaseProps } from './base';

interface AnnotationDataMarkerProps extends IAnnotationBaseProps {}

export default class DataMarker extends Base<AnnotationDataMarkerProps>{
  public annotationType = 'data-marker';
};
