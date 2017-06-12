var TrackviaAPI = require('../src/trackvia-api');

var tvApi = new TrackviaAPI(/*key, url*/)

function testIt() {
  tvApi.login(/*username, password*/)
  .then(() => {
    tvApi.getAppByName()
    .then((returned) =>{
      return console.log(`success: ${JSON.stringify(returned)}`)
    })
    .catch((returned) => {
      return console.log(`failed: ${JSON.stringify(returned)}`)
    })
  })
}

testIt();
