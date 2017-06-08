var TrackviaAPI = require('../src/trackvia-api');

var tvApi = new TrackviaAPI('06e44182a2304049fa8fab34251d8db5', 'https://go.trackvia.com')

function testIt() {
  tvApi.login('michael.c.scherer@gmail.com', 'WaterBottleEngine1')
  .then(() => {
    tvApi.attachFile(25, 2, 'This thing', '~/Downloads/6-1-2017 11.05.21pm_template_example (2).docx')
    .then((returned) =>{
      return console.log(`success: ${JSON.stringify(returned)}`)
    })
    .catch((returned) => {
      return console.log(`failed: ${JSON.stringify(returned)}`)
    })
  })
}

testIt();
