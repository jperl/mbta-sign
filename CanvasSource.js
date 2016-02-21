import Canvas, { Font } from 'canvas';

const mincraftia = new Font('mincraftia', __dirname + '/Minecraftia-Regular.ttf');

export default class CanvasSource {
  constructor() {
    this.width = 64;
    this.height = 32;
    this.canvas = new Canvas(this.width, this.height)
    this.context = this.canvas.getContext('2d');
    this.context.addFont(mincraftia);
    this.context.font = '8px mincraftia';
  }

  getPixels() {
    const imageData = this.context.getImageData(0, 0, this.width, this.height).data;
    return Array.prototype.slice.call(imageData);
  }

  getFrame() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.render();
    return this.getPixels();
  }
}
