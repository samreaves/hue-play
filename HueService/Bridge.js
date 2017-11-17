/**
 * @name Hue Play Bridge Model
 * @file Bridge.js
 * @description Initializes Hue Bridge.
 * @author Sam Reaves
 * @date November 17, 2017
 */

const bridgeConnector = require('hue-module'),
      huejay = require('huejay');

class Bridge {

  constructor(id, ipAddress) {
    this.id = id;
    this.ipAddress = ipAddress;
    this.username = '';
    this.client = {};
  }

  getID() {
    return this.id;
  }

  getIPAddress() {
    return this.ipAddress;
  }

  getUsername() {
    return new Promise((resolve, reject) => {
      bridgeConnector.load({
          host: this.ipAddress
      });

      bridgeConnector.getUsername((error, result) => {
          if (error) {
              console.log(error);
              console.log(result);
              reject(error);
          }
          else {
            console.log(`Hue bridge username found: ${result.username}`);
            this.username = result.username;
            resolve(result.username);
          }
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.getUsername()
        .then((username) => {

          /* Set Bridge client */
          this.client = new huejay.Client({
            host: this.ipAddress,
            username: this.username,
            timeout:  15000
          });

          resolve(this);

        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }
}

module.exports = Bridge;
