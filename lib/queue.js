class Queue {
  constructor () {
    this._store = [];
  }

  enqueue(value) {
    return this._store.push(value);
  }

  dequeue() {
    return this._store.shift();
  }

  peek() {
    return this._store[0];
  }

  isEmpty() {
    return !this._store.length > 0;
  }

};


export default Queue;