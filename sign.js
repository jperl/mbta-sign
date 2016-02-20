import { massAveEta } from './mbta';

function eta() {

}

// Render loop
function loop() {
  setImmediate(() => {
    eta();
    loop();
  });
}
