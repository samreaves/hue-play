/**
 * @name Hue Play Client Model
 * @file Client.js
 * @description Initializes Hue Client.
 * @author Sam Reaves
 * @date August 29, 2018
 */

const huejay = require('huejay');

class Client {

  constructor(credentials) {

    const { host, username, timeout } = credentials;

    if (!host || !username || !timeout) {
      throw new Error('Invalid credentials: Missing import parameter');
    }

    return this.connect(host, username, timeout);
  }

  connect(host, username, timeout) {
    return new Promise((resolve, reject) => {

      const client = new huejay.Client({
        host,
        username,
        timeout
      });

      if(!client) {
        reject('Error setting up client');
      }

      resolve(client);
    });
  }
}

module.exports = Client;
