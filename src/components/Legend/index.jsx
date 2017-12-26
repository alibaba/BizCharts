/**
 * Legend Component
 */
import BaseComponent from '../Base';

export default class Legend extends BaseComponent {
  static defaultProps = {
    visible: true,
  }

  constructor(props) {
    super(props, 'Legend');
  }
}
