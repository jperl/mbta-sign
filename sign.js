import LedMatrix from 'node-rpi-rgb-led-matrix';
import { getFrame } from './output';

const matrix = new LedMatrix(32, 2, 1);

function output(pixels) {
  var x = 0;
  var y = 0;

  for (var i = 0; i < pixels.length; i = i + 4) {
    var r = pixels[i];
    var g = pixels[i + 1];
    var b = pixels[i + 2];
    var a = Math.round((pixels[i + 3] / 256) * 100) / 100;

    matrix.setPixel(x, y, r, g, b);

    x++;
    if (x % 64 === 0) {
      x = 0;
      y++;
    }
  }
}

console.log('Starting sign output');

output(getFrame());
setInterval(() => {
  output(getFrame());
}, 1000);
