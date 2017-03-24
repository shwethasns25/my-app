import React, { Component } from 'react';
import { MusicAudio, Heading } from 'components';
import DoublyLinkedList from './dll';
import './module.scss';

const source = [
  { title: 'Rain',
    audio_url: 'http://www.schillmania.com/projects/soundmanager2/demo/_mp3/rain.mp3',
    image: 'http://images.all-free-download.com/images/graphiclarge/green_leaf_in_the_rain_205817.jpg'
  },
  { title: ' Love child ',
    audio_url: 'http://ring.get4mobile.net/ringtone/ringtone/zlP9HwPOJFtjgWuk7huddQ/1490373268/6490938c516aa7be39ca409deac1f551/accept-love_child.mp3',
    image: 'https://thumb7.shutterstock.com/display_pic_with_logo/4132423/409182841/stock-vector-man-and-woman-walking-vector-illustration-409182841.jpg'
  },
  { title: ' Another Second To Be',
    audio_url: 'http://ring.get4mobile.net/ringtone/ringtone/35ppf1pO9uOB8fycbRhSYg/1490373363/28434_wapres_ru/accept-another_second_to_be.mp3',
    image: 'http://cdn.wallpapersafari.com/60/98/lIufvn.jpg'
  },
  { title: 'Princess Of The Dawn',
    audio_url: 'http://ring.get4mobile.net/ringtone/ringtone/KK5XbBik78kbbOwuhBzjhQ/1490373363/28554_wapres_ru/accept-princess_of_the_dawn.mp3',
    image: 'https://thumbs.dreamstime.com/z/music-theme-4557693.jpg'
  },
  { title: ' Metal heart v2',
    audio_url: 'http://ring.get4mobile.net/ringtone/ringtone/k1-yRnaKWJOY0C3PMF27uw/1490373091/d34eb85b8824b6ea6970ffee66d40c57/accept-metal_heart_v2.mp3',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL8fWwXBHzwnFrUMMhI6RL3SmG7xrCcjW03Dq_hUejcgjxYxcm'
  },
];

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
      <div style={divStyle} className={'backgroundImage'}>
        <div>
          <Heading as={'h1'} className={'headingStyle'}>{this.state.title}</Heading>
        </div>
        <MusicAudio
          count={this.state.dll.getCount()}
          shuffle={this.state.shuffle}
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
