const mbtapi = require('mbtapi').create({
  apiKey: process.env.MBTA_API_KEY
});

function departureTimes(stopId) {
  return mbtapi.predictionsByStop(stopId).then(function (predictions) {
    const trips = predictions.mode[0].route[0].direction[0].trip;
    return trips.map(trip => {
      const arrivalTime = new Date(0);
      arrivalTime.setUTCSeconds(Number(trip.sch_arr_dt));
      return arrivalTime;
    });
  });
}

export const massAveEta = { inbound: [], outbound: [] };

function updateMassAveEta() {
  return Promise.all([
    departureTimes('70013'),
    departureTimes('70012')
  ]).then(times => {
    massAveEta.inbound = times[0];
    massAveEta.outbound = times[1];
    console.log('ETA updated', massAveEta);
  });
}

// Update the eta on an interval
updateMassAveEta();

const interval = Number(process.env.UPDATE_ETA_INTERVAL);
setInterval(updateMassAveEta, interval);
