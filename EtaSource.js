import moment from 'moment';
import { massAveEta } from './mbta';
import CanvasSource from './CanvasSource';

export default class EtaSource extends CanvasSource {
  minsFromNow(date) {
    return moment(date).diff(moment(), 'minutes');
  }

  inboundEta() {
    let text = '';

    if (massAveEta.inbound.length) {
      text += 'INB ' + this.minsFromNow(massAveEta.inbound[0]);
    }

    if (massAveEta.outbound.length) {
      if (text.length) text += ' ';

      text += 'OUT ' + this.minsFromNow(massAveEta.outbound[0]);
    }

    return text || 'No Eta';
  }

  render() {
    this.context.fillText(this.inboundEta(), 0, this.height / 2);
  }
}
