/**
 * @name Hue Play Hue Connector
 * @file hue.js
 * @description Initializes Hue connection Provides API to Hue lights.
 * @author Sam Reaves
 * @date November 17, 2017
 */

const huejay = require('huejay'),
      Client = require('./Client');
      creds = require('../.credentials.json');

console.log(creds);

class HueService {

  constructor() {
    return this.createClient(creds);
  }

  createClient(credentials) {
    return new Client(credentials);
  }
}

module.exports = HueService;
