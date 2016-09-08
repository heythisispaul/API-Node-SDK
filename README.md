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
All methods return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
These Promises will resolve to an object (JSON response from the request), except for files, which will resolve to a string of the binary representation of the file.

---


#### login
_Authenticates as specified user._

Parameters:
* username : string
  * Username of Trackvia account.
* password : string

---

#### getApps
_Gets all apps available._

Parameters: _none_

---

#### getAppByName
_Get an app by name._

Parameters:
* name : string

---

#### getUsers
_Get all users, optionally paged._

Parameters:
* paging : object
  * Properties:
    * start : number
      * Starting index for paging.
    * max : number
      * Page size.

---


## Additional Information
For additional information visit https://developer.trackvia.com/.
Note that the endpoints explained in the [docs](https://developer.trackvia.com/livedocs) are from the public api itself. This library is a wrapper around those endpoints to make development easier.