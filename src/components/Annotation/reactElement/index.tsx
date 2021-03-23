import Base, { IAnnotationBaseProps } from '../base';
import { ReactElementAnnotationCfg } from './component';


type BaseProps = Omit<IAnnotationBaseProps, 'offsetX'>;

export interface HtmlAnnotationProps extends ReactElementAnnotationCfg, BaseProps {}

export default class Html extends Base<HtmlAnnotationProps>{
  public annotationType = 'ReactElement';
};
