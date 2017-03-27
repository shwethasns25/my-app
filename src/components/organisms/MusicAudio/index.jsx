import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './module.scss';

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
      <button onClick={this.props.backward} disabled={disable} className={'fa fa-step-backward'} />
    );
  }

  renderShuffleBtn = () => {
    let disable = false;
    if (this.props.count === 1) {
      disable = true;
    }
    return (
      <button onClick={this.props.random} disabled={disable} className={'fa fa-random shuffleBtn'} />
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
      <button onClick={this.props.forward} disabled={disable} className={'fa fa-step-forward'} />
    );
  }

  render() {
    const toggleClassName = classnames({
      fa: true,
      'fa-play': (this.state.playBtn),
      'fa-pause': !(this.state.playBtn)
    });
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
          <button onClick={this.toggleButton} className={toggleClassName} />
          {this.renderForwardBtn()}
          <div className={'shuffleBtn'}>{this.renderShuffleBtn()}</div>
        </div>
      </div>
    );
  }
}
