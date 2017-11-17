/**
 * @name Hue Play Hue Connector
 * @file hue.js
 * @description Initializes Hue connection Provides API to Hue lights.
 * @author Sam Reaves
 * @date November 17, 2017
 */
const HueService = require('./HueService');

HueService.connect().then((hueService) => {
  hueService.bridges[0].connect().then((bridge) => {

    bridge.client.lights.getAll()
      .then(lights => {

        for (let light of lights) {
          console.log(`Light [${light.id}]: ${light.name}`);
          console.log(`  Type:             ${light.type}`);
          console.log(`  Unique ID:        ${light.uniqueId}`);
          console.log(`  Manufacturer:     ${light.manufacturer}`);
          console.log(`  Model Id:         ${light.modelId}`);
          console.log('  Model:');
          console.log(`    Id:             ${light.model.id}`);
          console.log(`    Manufacturer:   ${light.model.manufacturer}`);
          console.log(`    Name:           ${light.model.name}`);
          console.log(`    Type:           ${light.model.type}`);
          console.log(`    Color Gamut:    ${light.model.colorGamut}`);
          console.log(`    Friends of Hue: ${light.model.friendsOfHue}`);
          console.log(`  Software Version: ${light.softwareVersion}`);
          console.log('  State:');
          console.log(`    On:         ${light.on}`);
          console.log(`    Reachable:  ${light.reachable}`);
          console.log(`    Brightness: ${light.brightness}`);
          console.log(`    Color mode: ${light.colorMode}`);
          console.log(`    Hue:        ${light.hue}`);
          console.log(`    Saturation: ${light.saturation}`);
          console.log(`    X/Y:        ${light.xy[0]}, ${light.xy[1]}`);
          console.log(`    Color Temp: ${light.colorTemp}`);
          console.log(`    Alert:      ${light.alert}`);
          console.log(`    Effect:     ${light.effect}`);
          console.log();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
