/**
 * Label Component
 */
import invariant from 'invariant';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { Util } from '../../shared';

export default class Label extends Component {
  static contextTypes = {
    geom: PropTypes.object,
  }

  componentWillMount() {
    const { props } = this;
    const { geom } = this.context;
    const { content, ...others } = props;

    invariant(geom, '`<Label />` must be wrapped in `<Geom />`');

    if (content) {
      if (Util.isArray(content)) {
        geom.label(content[0], content[1], others);
      } else {
        geom.label(content, others);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { geom } = this.context;
    const { content, ...props } = this.props;
    const { content: nextContent, ...nextAttrs } = nextProps;

    if (!Util.shallowEqual(props, nextAttrs)
        || !Util.shallowEqual(content, nextContent)
      ) {
      if (Util.isArray(nextContent)) {
        geom.label(nextContent[0], nextContent[1], nextAttrs);
      } else {
        geom.label(nextContent, nextAttrs);
      }
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    // this.context.batchedUpdates();
    // need g2 add api to clear label
  }

  render() {
    return null;
  }
}
