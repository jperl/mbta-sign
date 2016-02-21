const mbtapi = require('mbtapi').create({
  apiKey: process.env.MBTA_API_KEY,
});

function arrivalTimes(stopId) {
  return mbtapi.predictionsByStop(stopId).then(function (predictions) {
    const trips = predictions.mode[0].route[0].direction[0].trip;
    return trips.map(trip => {
      var predictionDate = new Date();
      predictionDate.setSeconds(predictionDate.getSeconds() +  Number(trip.pre_away));
      return predictionDate;
    });
  });
}

export const massAveEta = { forestHills: [], oakGrove: [] };

function updateMassAveEta() {
  return Promise.all([
    arrivalTimes('70013'),
    arrivalTimes('70012')
  ]).then(times => {
    massAveEta.oakGrove = times[0];
    massAveEta.forestHills = times[1];
    console.log('ETA updated', massAveEta);
  });
}

// Update the eta on an interval
updateMassAveEta();

const interval = Number(process.env.UPDATE_ETA_INTERVAL);
setInterval(updateMassAveEta, interval);
