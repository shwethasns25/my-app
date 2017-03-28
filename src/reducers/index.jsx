import { FETCH_TRACK } from 'constants';
import DoublyLinkedList from './dll';
import source from './source.json';

const dll = new DoublyLinkedList();
source.map((data, i) => {
  dll.add(data, i);
});
const currNode = dll.getHead();

const initialState = {
  track: currNode.data.audio_url,
  title: currNode.data.title,
  image: currNode.data.image,
  count: dll.getCount()
};

const musicPlayer = (state = initialState, action) => {
  const trackNode = dll.getNodeAt(action.index);
  switch (action.type) {
    case FETCH_TRACK:
      return {
        ...state,
        track: trackNode.audio_url,
        title: trackNode.title,
        image: trackNode.image,
      };
    default:
      return state;
  }
};

export default musicPlayer;
