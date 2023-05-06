const core = require('@actions/core');
const pinataSDK = require('@pinata/sdk');

// async function getPinList(pinata, pinName, offset) {
//     console.log(`Calling API to get pin list with pinName ${pinName} at offset ${offset}`)
//     return pinata.getPinList
// }

try {
  // inputs are defined in action metadata file
  const pinataKey = core.getInput('pinataKey');
  const pinataSecret = core.getInput('pinataSecret');
  const pinName = core.getInput('pinName');
  // const offset = core.getInput('offset');

  const pinata = new pinataSDK(pinataKey, pinataSecret);
  console.log(`Pin Name: ${pinName}`);
  pinata
    .testAuthentication()
    .then(result => {
      //handle successful authentication here
      // const cidList = getPinList(pinata, pinName, offset)
      console.log(result);
      // core.setOutput("cids", cidList)
    })
    .catch(err => {
      //handle error here
      console.log(err);
    });
} catch (error) {
  core.setFailed(error.message);
}
