import invariant from 'invariant';
import BaseComponent from '../Base';
import { Util } from '../../shared';

export default class Facet extends BaseComponent {
  constructor(props) {
    super(props, 'Facet');

    const { children } = props;
    let relChildren = null;

    if (children) {
      invariant(Util.isFunction(children), '<Facet> only have one function child!');

      relChildren = [];
      let key = 0;
      this.eachView = (view, facet) => {
        let viewChild = children(view, facet);
        if (viewChild) {
          key += 1;
          // 需要告诉 View 组件，无需创建 G2 view 示例，而使用此处的 view。
          viewChild = React.cloneElement(
            viewChild,
            Object.assign({}, viewChild.props, { instance: view, key })
          );
          relChildren.push(viewChild);
        }
      };
      // must 
    }

    this.relChildren = relChildren;
  }

  componentWillMount() {
    this.id = this.context.createId();
    this.context.addElement(
      this.name,
      this.id,
      this.eachView ? { eachView: this.eachView, ...this.props } : { ...this.props },
      this.context.getParentInfo(),
      this.context.getViewId()
    );
  }

  render() {
    if (this.relChildren) {
      return <div>{ this.relChildren }</div>;
    }

    return null;
  }
};
