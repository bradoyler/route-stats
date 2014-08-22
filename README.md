# Route-Stats
Middleware to monitor http requests across your Express app (requires Redis)

## Test
```sh
npm test
```

## How to use
```js

var routeStats = require('route-stats');

// logs stats and reset every 60 seconds
app.use(routeStats.logFor(60));

// display stats
app.get('/stats', routeStats.show(), function(req, res){
	res.send(res.stats);
});

```

### Example output
```js
[ { '/home': '2', '/test': '1' },
  { '127.0.0.1:60116': '3', version: '0.0.1' } ]
```

------
The MIT License (MIT)

Copyright (c) 2014 Brad Oyler

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
