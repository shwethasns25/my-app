import React, { Component, PropTypes } from 'react';

export default class RihConfig extends Component {
  static propTypes = {
    fetch: PropTypes.func,
  }

  componentDidMount() {
    this.props.fetch();
  }
  render() {
    return (
      <div>hello</div>
    );
  }
}
