import React from 'react';

class InnerContent extends React.Component {
  state = { content: ''}
  public refresh(content: React.ReactNode = '') {
    // 刷新钩子
    this.setState({ content })
  }
  render() {
    return <>
    {this.state.content}
    </>;
  }
}

export default InnerContent;
