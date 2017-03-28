class Node {
  constructor(data) {
    this.data = data;
    this.previous = null;
    this.next = null;
  }
}

export default class DoublyLinkedList {
  constructor() {
    this.count = 0;
    this.head = null;
    this.tail = null;
  }

  getCount = () => {
    return this.count;
  }

  getHead = () => {
    return this.head;
  }

  print = () => {
    if (this.head) {
      const arr = [];
      let current = this.head;
      for (let i = 0; i < this.count; i += 1) {
        arr[i] = current.data;
        current = current.next;
      }
      return arr;
    }
    return null;
  }

  getNodeAt = (index) => {
    if (index > -1 && index < this.count) {
      let current = this.head;
      let i = 0;
      while (i < index) {
        current = current.next;
        i += 1;
      }
      return current.data;
    }
    return null;
  }

  addFirst = (data) => {
    const node = new Node(data);
    node.next = this.head;
    this.head = node;
    if (this.count === 0) {
      this.tail = this.head;
    } else {
      this.head.next.previous = this.head;
    }
    this.count += 1;
  }

  addLast = (data) => {
    const node = new Node(data);
    node.previous = this.tail;
    if (this.count === 0) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
    this.count += 1;
  }

  add = (data, index) => {
    if (index > 0 && index < this.count) {
      const node = new Node(data);
      let current = this.head;
      let i = 0;
      while (i < index) {
        current = current.next;
        i += 1;
      }
      current.previous.next = node;
      node.next = current;
      node.previous = current.previous;
      current.previous = node;
      this.count += 1;
    } else if (index < 1) {
      this.addFirst(data);
    } else {
      this.addLast(data);
    }
  }

  removeFirst = () => {
    if (this.head) {
      this.head = this.head.next;
      this.count -= 1;
      if (this.count === 0) {
        this.tail = null;
      } else {
        this.head.previous = null;
      }
    }
  }

  removeLast = () => {
    if (this.head) {
      if (this.count === 1) {
        this.head = null;
        this.tail = null;
      } else {
        this.tail.previous.next = null;
        this.tail = this.tail.previous;
      }
      this.count -= 1;
    }
  }

  removeAt = (index) => {
    if (index > 0 && index < this.count - 1) {
      let current = this.head;
      let i = 0;

      while (i < index) {
        current = current.next;
        i += 1;
      }
      current.previous.next = current.next;
      current.next.previous = current.previous;
      this.count -= 1;
    } else if (index < 1) {
      this.removeFirst();
    } else {
      this.removeLast();
    }
  }
}
