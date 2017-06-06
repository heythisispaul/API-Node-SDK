var TrackviaAPI = require('../src/trackvia-api');

var tvApi = new TrackviaAPI('06e44182a2304049fa8fab34251d8db5', 'https://go.trackvia.com')


function testIt() {
  tvApi.getView()
  .then((returned) => {
    return console.log(`success: ${JSON.stringify(returned)}`)
  })
  .catch((returned) => {
    return console.log(`failed: ${JSON.stringify(returned)}`)
  })
}

testIt();
