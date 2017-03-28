import React, { Component, PropTypes } from 'react';
import { MusicAudio, Heading } from 'components';
import './module.scss';

export default class MusicApp extends Component {

  static propTypes = {
    getTrackNode: PropTypes.func,
    title: PropTypes.string,
    image: PropTypes.string,
    track: PropTypes.string,
    count: PropTypes.number
  }

  state = { playStatus: false, index: 0, dll: {}, shuffle: false }

  randomNode = () => {
    const myAudio = document.getElementById('myAudio');
    const min = 0;
    const max = this.state.dll.getCount() - 1;
    const index = Math.floor(Math.random() * ((max - min) + 1)) + min;
    this.props.getTrackNode(index);
    this.setState({ index });
    myAudio.load();
  }

  forward = () => () => {
    if (!this.state.shuffle) {
      const myAudio = document.getElementById('myAudio');
      const index = this.state.index;
      this.props.getTrackNode(index + 1);
      this.setState({ index: index + 1 });
      myAudio.load();
    } else {
      this.randomNode();
    }
  }

  backward = () => () => {
    if (!this.state.shuffle) {
      const myAudio = document.getElementById('myAudio');
      const index = this.state.index;
      this.props.getTrackNode(index - 1);
      this.setState({ index: index - 1 });
      myAudio.load();
    } else {
      this.randomNode();
    }
  }

  randomTrack = () => () => {
    const shuffleState = this.state.shuffle;
    this.setState({ shuffle: !shuffleState });
  }

  render() {
    const divStyle = {
      backgroundImage: `url(${this.props.image})`
    };
    return (
      <div className={'mainDiv'}>
        <div style={divStyle} className={'backgroundImage'}>
          <div>
            <Heading as={'h1'} className={'headingStyle'}>{this.props.title}</Heading>
          </div>
        </div>
        <MusicAudio
          shuffle={this.state.shuffle}
          count={this.props.count}
          index={this.state.index}
          forward={this.forward()}
          backward={this.backward()}
          random={this.randomTrack()}
          src={this.props.track}
          endSong={this.forward()}
        />
      </div>
    );
  }
}
