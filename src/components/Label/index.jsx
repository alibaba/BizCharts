/**
 * Label Component
 */
import invariant from 'invariant';
import BaseComponent from '../Base';

export default class Label extends BaseComponent {
  constructor(props) {
    super(props, 'Label');
  }

  componentWillMount() {
    const parentInfo = this.context.getParentInfo();
    invariant(parentInfo.name === 'Geom', '`<Label />` must be wrapped in `<Geom />`');

    this.id = this.context.createId();

    this.context.addElement(
      this.name, this.id, this.props,
      this.context.getParentInfo(),
      this.context.getViewId()
    );
  }
}
