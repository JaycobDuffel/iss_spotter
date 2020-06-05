
const {
  nextISSTimesForMyLocation
 } = require('./iss');



 const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    let datetime = new Date(1)
    datetime.setUTCSeconds(pass.risetime);
   datetime = datetime.toLocaleString('en-US', {timeZone: "America/Los_Angeles"})
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

// nextISSTimesForMyLocation((error, passTimes) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }
//   // success, print out the deets!
//   printPassTimes(passTimes);
// });

module.exports = {
  printPassTimes
}