import Canvas from 'canvas';

export default class CanvasSource {
  constructor() {
    this.width = 64;
    this.height = 32;
    this.canvas = new Canvas(this.width, this.height)
    this.context = this.canvas.getContext('2d');
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
