/**
 * Legend Component
 */
import BaseComponent from '../Base';
import PropTypes from 'prop-types';

export default class Legend extends BaseComponent {
  static contextTypes = {
    addElement: PropTypes.func,
    updateElement: PropTypes.func,
    deleteElement: PropTypes.func,
    createId: PropTypes.func,
    getParentInfo: PropTypes.func,
    getViewId: PropTypes.func,
  }

  static childContextTypes = {
    addElement: PropTypes.func,
    updateElement: PropTypes.func,
    deleteElement: PropTypes.func,
    createId: PropTypes.func,
    getParentInfo: PropTypes.func,
    getViewId: PropTypes.func,
  }
  
  static defaultProps = {
    visible: true,
  }

  constructor(props) {
    super(props, 'Legend');
  }
}
