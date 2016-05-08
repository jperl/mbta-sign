import moment from 'moment';
import { massAveEta } from './mbta';
import CanvasSource from './CanvasSource';

export default class EtaSource extends CanvasSource {
  timeString(date) {
    const seconds = moment(date).diff(moment(), 'seconds');

    if (seconds <= 0) {
      return 'Arriving';
    } else if (seconds < 60) {
      return seconds + ' s';
    }

    return Math.floor(seconds / 60) + ' min';
  }

  etaText(predictions) {
    if (predictions && predictions.length) {
      let text = '';

      for (var i = 0; i < 2 && i < predictions.length; i++) {
        if (text.length) text += ', ';
        text += this.timeString(predictions[i]);
      }

      return text;
    }

    // If there are no predictions show nothing
    return '';
  }

  lineOne() {
    return 'Oak Grove';
  }

  lineTwo() {
    return this.etaText(massAveEta.oakGrove);
  }

  lineThree() {
    return 'Forest Hills';
  }

  lineFour() {
    return this.etaText(massAveEta.forestHills);
  }

  render() {
    this.context.fillStyle = '#fc8b00';
    this.context.textAlign = 'left';
    this.context.fillText(this.lineOne(), 0, 12);

    this.context.fillStyle = '#00B157';
    this.context.textAlign = 'right';
    this.context.fillText(this.lineTwo(), 64, 20);

    this.context.fillStyle = '#fc8b00';
    this.context.textAlign = 'left';
    this.context.fillText(this.lineThree(), 0, 28);

    this.context.fillStyle = '#00B157';
    this.context.textAlign = 'right';
    this.context.fillText(this.lineFour(), 64, 36);
  }
}
