export default class ArrayBufferConverter {
  constructor() {
    this.buffer = null;
  }

  load(buffer) {
    if (buffer instanceof ArrayBuffer) {
      this.buffer = buffer;
    } else {
      throw new Error('Only an object of type ArrayBuffer can be loaded!');
    }
  }

  toString() {
    if (!this.buffer) {
      throw new Error('Buffer not loaded!');
    }
    return String.fromCharCode.apply(null, new Uint16Array(this.buffer));
  }
}
