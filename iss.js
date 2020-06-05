const request = require('request');

const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {

    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip)

  })
}

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body).data;

    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
const URL = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
request(URL, (error, response, body) => {
  if (error) {
    callback(error, null);
    return;
  }

  if (response.statusCode !== 200) {
    callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
    return;
  }

  const passes = JSON.parse(body).response;
  callback(null, passes);
});
}

const nextISSTimesForMyLocation = (callback) => {

  fetchMyIP((error, ip) => {
    if (error) {
      return error
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null)
      }

      fetchISSFlyOverTimes(coords, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
        
      });
    });
  });

};

module.exports = { 
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
 };