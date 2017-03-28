import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MusicApp } from 'components';
import { getTrackNode } from 'actions';

class MusicPlayerContainer extends Component {
  render() {
    if (!this.props) {
      return null;
    }
    return (
      <MusicApp
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    track: state.track,
    title: state.title,
    image: state.image,
    count: state.count,
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ getTrackNode }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(MusicPlayerContainer);
