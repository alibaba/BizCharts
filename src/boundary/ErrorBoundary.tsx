import React from 'react';

class ErrorBoundary extends React.Component<any> {
  private death: boolean;

  static getDerivedStateFromError() {
    return {};
  }

  componentDidCatch() {
    this.death = true;
  }

  render() {
    const { errorContent } = this.props;
    if (this.death) {
      this.death = false; // 挂一次后要复活
      return (
        errorContent ? errorContent : <div style={{ color: '#aaa' }}>Bizcharts something error</div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
