import ArrayBufferConverter from '../arraybufferconverter';

test('Converter should convert ArrayBuffer to string', () => {
  const resultData = '{"data":{"user":{"id":1,"name":"Hitman","level":10}}}';

  function getBuffer() {
    const data = resultData;
    return ((input) => {
      const buffer = new ArrayBuffer(input.length * 2);
      const bufferView = new Uint16Array(buffer);
      for (let i = 0; i < input.length; i += 1) {
        bufferView[i] = input.charCodeAt(i);
      }
      return buffer;
    })(data);
  }

  const converter = new ArrayBufferConverter();
  converter.load(getBuffer());
  expect(`${converter}`).toBe(resultData);
});

test('Buffer must be instance of ArrayBuffer', () => {
  function testLoadMethod() {
    const converter = new ArrayBufferConverter();
    converter.load('ArrayBuffer');
  }

  expect(testLoadMethod).toThrow(new Error('Only an object of type ArrayBuffer can be loaded!'));
});

test('Buffer must be loaded before convert it to string', () => {
  function testLoadMethod() {
    const converter = new ArrayBufferConverter();
    return `${converter}`;
  }

  expect(testLoadMethod).toThrow(new Error('Buffer not loaded!'));
});
