import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  shouldComponentUpdate() {
    if (this.state.hasError) {
      // 在update前重置error标记
      // 为顾及React16.3之前的用户，因此没有将该逻辑放在getDerivedStateFromProps里
      this.setState({ hasError: false });
    }
    return true;
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  unstable_handleError() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>bizcharts error.</h1>;
    }
    return this.props.children;
  }
}
