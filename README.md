# API-Node-SDK
Node.js SDK for working with application data in TrackVia.

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

## Methods
#### login
_Authenticates as specified user._
Parameters:
* username : string - Username of Trackvia account.
* password : string
Returns: Promise<Object>

#### getApps
_Gets all apps available._
Parameters: _none_
Returns: Promise<Object>


## Additional Information
For additional information visit https://developer.trackvia.com/.
Note that the endpoints explained in the [docs](https://developer.trackvia.com/livedocs) is the public api itself. This library is a wrapper around those endpoints to make development easier.