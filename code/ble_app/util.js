import { decode } from 'base-64';

const base64Bytes = (s) => {
  const raw = decode(s);
  const bytes = new Uint8Array(new ArrayBuffer(raw.length));
  for (let i = 0; i < raw.length; i += 1) {
    bytes[i] = raw.charCodeAt(i);
  }
  return bytes;
}

const accelData = (bytes) => {
  const values = [];
  const indices = {
    x: [0, 2],
    y: [2, 4],
    z: [4, 6],
    time: [6, 10],
  };

  return Object.entries(indices).reduce((acc, [k, [a, b]]) => {
    const data = new DataView(Uint8Array.from(bytes.slice(a, b)).buffer);
    if (b - a === 2) {
      acc[k] = data.getInt16(0, true) / 16384.0;
    } else if (b - a === 4) {
      acc[k] = data.getInt32(0, true);
    }
    return acc;
  }, {});
}

const sum = a => a.reduce((acc, val) => acc + val);

const mean = a => sum(a) / a.length

const variance = (a) => {
  const m = mean(a);
  return mean(a.map(val => Math.pow(val - m, 2)));
}

const isPeak = (lag, value, threshold = 3) => {
  const z = (value - mean(lag)) / Math.sqrt(variance(lag));
  console.log(lag.length, value, mean(lag), z)
  if (Math.abs(z) > threshold) {
    return Math.sign(z);
  }
  return 0;
}

export { accelData, base64Bytes, isPeak };
