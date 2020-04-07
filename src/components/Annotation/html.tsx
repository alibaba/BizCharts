import Base, { IAnnotationBaseProps } from './base';

export interface AnnotationHtmlProps extends IAnnotationBaseProps {
  el: HTMLElement;
}

export default class Html extends Base<AnnotationHtmlProps>{
  public annotationType = 'html';
};
