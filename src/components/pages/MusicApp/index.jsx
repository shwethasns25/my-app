import React, { Component } from 'react';
import { MusicAudio, Heading } from 'components';
import DoublyLinkedList from './dll';
import source from './source.json';
import './module.scss';

export default class MusicApp extends Component {

  state = { track: '', img: '', title: '', playStatus: false, index: '', dll: {}, shuffle: false }

  componentWillMount() {
    const dll = new DoublyLinkedList();
    source.map((data, i) => {
      dll.add(data, i);
    });
    const currNode = dll.getHead();
    this.setState({ img: currNode.data.image, title: currNode.data.title, track: currNode.data.audio_url, index: 0, dll });
  }

  randomNode = () => {
    const myAudio = document.getElementById('myAudio');
    const min = 0;
    const max = this.state.dll.getCount() - 1;
    const index = Math.floor(Math.random() * ((max - min) + 1)) + min;
    const rondomNode = this.state.dll.getNodeAt(index);
    this.setState({ img: rondomNode.image, title: rondomNode.title, track: rondomNode.audio_url, index });
    myAudio.load();
  }

  forward = () => () => {
    if (!this.state.shuffle) {
      const myAudio = document.getElementById('myAudio');
      const index = this.state.index;
      const forwardNode = this.state.dll.getNodeAt(index + 1);
      this.setState({ img: forwardNode.image, title: forwardNode.title, track: forwardNode.audio_url, index: index + 1 });
      myAudio.load();
    } else {
      this.randomNode();
    }
  }

  backward = () => () => {
    if (!this.state.shuffle) {
      const myAudio = document.getElementById('myAudio');
      const index = this.state.index;
      const backwardNode = this.state.dll.getNodeAt(index - 1);
      this.setState({ img: backwardNode.image, title: backwardNode.title, track: backwardNode.audio_url, index: index - 1 });
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
      backgroundImage: `url(${this.state.img})`
    };
    return (
      <div className={'mainDiv'}>
        <div style={divStyle} className={'backgroundImage'}>
          <div>
            <Heading as={'h1'} className={'headingStyle'}>{this.state.title}</Heading>
          </div>
        </div>
        <MusicAudio
          shuffle={this.state.shuffle}
          count={this.state.dll.getCount()}
          index={this.state.index}
          forward={this.forward()}
          backward={this.backward()}
          random={this.randomTrack()}
          src={this.state.track}
          endSong={this.forward()}
        />
      </div>
    );
  }
}
