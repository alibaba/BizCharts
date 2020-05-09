import Base, { IAnnotationBaseProps } from './base';
import { AnnotationPosition } from '../../interface';

export interface AnnotationArcProps extends IAnnotationBaseProps {
  /** 起始位置 */
  readonly start: AnnotationPosition;
  /** 结束位置 */
  readonly end: AnnotationPosition;
}

export default class Arc extends Base<AnnotationArcProps>{
  public annotationType = 'arc';
};
