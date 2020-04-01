import React from 'react';

class ErrorBoundary extends React.Component {
  private death: boolean;

  static getDerivedStateFromError() {
    return {};
  }

  componentDidCatch(error, errorInfo) {
    this.death = true;
  }

  render() {
    if (this.death) {
      this.death = false; // 挂一次后要复活
      return (
        <div>error</div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
