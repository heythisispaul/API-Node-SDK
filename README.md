# API-Node-SDK
Node.js SDK for working with application data in TrackVia

## Getting Started
Login to your Trackvia account and navigate to https://go.trackvia.com/#/my-info. Copy down the API key.

Include the `build/trackvia-api.js` into your project.

Create an instance of the Trackvia api with your API key:
```javascript
var TrackviaAPI = require('./path/to/trackvia-api.js');

var api = TrackviaAPI('YOUR KEY HERE');
```

## Authenticating
You must authenticate before accessing any data in Trackvia.
```javascript
api.login('myTrackviaAccount@gmail.com', 'myPassword')
.then(() => {
    // Successfully authenticated..
    // Make additional request in here
});
```