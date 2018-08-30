/**
 * @name Hue Play Hue Connector
 * @file hue.js
 * @description Initializes Hue connection Provides API to Hue lights.
 * @author Sam Reaves
 * @date November 17, 2017
 */
const HueService = require('./HueService');

new HueService()
  .then((client) => {

    client.lights.getAll()
      .then(lights => {

        lights
          .filter((light) => {
            return light.model.id === 'LCT014';
          })
          .forEach((light, index) => {

          console.log('------- INITIAL -------')
          logMeta(light);

          /**
           *
           * Color
           * brightness - (1 to 253)
           * colorMode - (Set to hs)
           * hue - (1 to 65534)
           * saturation - (1 to 253)
           * colorTemp - (153 to 500)
           *
           * Other
           * transitionTime (seconds)
           * effect (none / colorloop)
           * on
           *
           */

           /* If first in the array */
           console.log(index);
           if (index === 0) {
             light.on = true;
           }

           /* Change color mode to hsl */
           light.colorMode = 'hs';

           /* Change brightness between 1 and 254 */
           light.brightness = 254;

           /* Change saturation to 253 */
           light.saturation = 254;

           /* Change hue to 0 (red) */
           light.hue = Math.ceil((302 / 360) * 65534);

           console.log('------ AFTER ------')

           logMeta(light);

           /* Save light state */
           client.lights.save(light);
        });
    })
    .catch((getAllLightsError) => {
      console.log(getAllLightsError);
    });
}).catch((clientCreateError) => {
  console.log(clientCreateError)
});


function logMeta(light) {
  console.log()
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
