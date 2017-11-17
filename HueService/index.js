/**
 * @name Hue Play Hue Connector
 * @file hue.js
 * @description Initializes Hue connection Provides API to Hue lights.
 * @author Sam Reaves
 * @date November 17, 2017
 */

const huejay = require('huejay'),
      Bridge = require('./Bridge');

class HueService {

  constructor() {
    this.bridges = [];
  }

  connect() {
    return new Promise((resolve, reject) => {

      this.getHueBridges().then((bridges) => {
        this.bridges = bridges.map((bridge) => new Bridge(bridge.id, bridge.ip));
        resolve(this);
      }).catch((error) => {
        console.log('Can\'t find Hue bridges');
        reject(error);
      });
      
    }).catch((error) => {
      console.log(error);
    });
  }

  /* Use Huejay to discover the network's Hue Bridge, then store bridge data in memory */
  getHueBridges() {
    return huejay.discover();
  }
}

module.exports = new HueService();
