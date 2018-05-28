import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../Base';

function generateTypedGeom(name, geomType) {
  class TypedGeom extends BaseComponent {
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

    static propTypes = {
      type: PropTypes.string,
    }

    static defaultProps = {
      type: geomType,
    }

    constructor(props) {
      super(props, name);
    }

    getChildContext() {
      return {
        addElement: this.context.addElement,
        updateElement: this.context.updateElement,
        deleteElement: this.context.deleteElement,
        createId: this.context.createId,
        getParentInfo: this.getParentInfo,
        getViewId: this.context.getViewId,
      };
    }
  }

  return TypedGeom;
}

export default generateTypedGeom;
