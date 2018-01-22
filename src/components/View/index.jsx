/**
 * View Component
 */
import BaseComponent from '../Base';

export default class View extends BaseComponent {
  constructor(props) {
    super(props, 'View');
  }

  getChildContext() {
    return {
      getViewId: this.getViewId,
    };
  }

  getViewId = () => { 
    return this.id;
  }
}
