import React, { Component, PropTypes } from 'react';
import './module.scss';

const icons = {
  next: 'https://image.flaticon.com/icons/svg/25/25309.svg',
  previous: 'https://image.flaticon.com/icons/svg/25/25641.svg',
  play: 'http://pngimages.net/sites/default/files/play-png-image-54101.png',
  pause: 'http://icon-icons.com/icons2/495/PNG/512/video-control-pause_icon-icons.com_48386.png',
  activeShuffle: 'http://icons.iconarchive.com/icons/danieledesantis/audio-video-outline/256/shuffle-icon.png',
  shuffle: 'http://icons.iconarchive.com/icons/iconsmind/outline/256/Shuffle-2-icon.png',
};

export default class MusicAudio extends Component {

  static propTypes = {
    src: PropTypes.string,
    index: PropTypes.number,
    count: PropTypes.number,
    backward: PropTypes.func,
    forward: PropTypes.func,
    random: PropTypes.func,
    endSong: PropTypes.func,
    shuffle: PropTypes.bool,
  }

  static defaultProps = {
    src: '',
    index: 0,
    count: 0,
    playStatus: false
  }

  constructor(props) {
    super(props);
    window.onload = () => {
      this.myAudio = document.getElementById('myAudio');
      this.myRange = document.getElementById('myInput');
    };
  }

  state = { playBtn: false, start: '00:00', elapsed: '00:00' }

  onSongEnd = () => {
    this.props.endSong();
  }

  progressHandle = () => () => {
    const value = this.myRange.value;
    const currTime = (value * this.myAudio.duration) / 100;
    this.myAudio.currentTime = currTime;
  }

  timeUpdate = () => {
    const elapsed = ((this.myAudio.currentTime / this.myAudio.duration) * 100);
    this.myRange.value = elapsed;
  }

  toggleButton = () => {
    if (this.myAudio.paused) {
      this.myAudio.play();
      this.setState({ playBtn: false });
    } else {
      this.myAudio.pause();
      this.setState({ playBtn: true });
    }
  }

  renderBackwardBtn = () => {
    let disable = false;
    if (this.props.shuffle) {
      disable = false;
    } else if (this.props.index === 0 || this.props.count === 1) {
      disable = true;
    }
    return (
      <button onClick={this.props.backward} disabled={disable}><img src={icons.previous} alt={'previous'} /></button>
    );
  }

  renderShuffleBtn = () => {
    let disable = false;
    if (this.props.count === 1) {
      disable = true;
    }
    return (
      <button onClick={this.props.random} disabled={disable}>{ (this.props.shuffle) ? <img src={icons.activeShuffle} alt={'shuffle'} /> : <img src={icons.shuffle} alt={'shuffle'} /> }</button>
    );
  }

  renderForwardBtn = () => {
    let disable = false;
    if (this.props.shuffle) {
      disable = false;
    } else if (this.props.index === this.props.count - 1 || this.props.count === 1) {
      disable = true;
    }
    return (
      <button onClick={this.props.forward} disabled={disable}><img src={icons.next} alt={'next'} /></button>
    );
  }

  render() {
    return (
      <div className={'controls'}>
        <div>
          <input id={'myInput'} type={'range'} value={'0'} onChange={this.progressHandle()} className={'audio'} />
        </div>
        <div className={'buttonStyles'}>
          <audio autoPlay id={'myAudio'} onTimeUpdate={this.timeUpdate} onEnded={this.onSongEnd}>
            <source src={this.props.src} type={'audio/mpeg'} />
          </audio>
          {this.renderBackwardBtn()}
          <button onClick={this.toggleButton}>{ (this.state.playBtn) ? <img src={icons.play} alt={'play'} /> : <img src={icons.pause} alt={'pause'} /> }</button>
          {this.renderForwardBtn()}
          {this.renderShuffleBtn()}
        </div>
      </div>
    );
  }
}
