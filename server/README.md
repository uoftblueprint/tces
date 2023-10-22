# Server

## Logging
For our logger, we will be using [Pino](https://getpino.io/#/)

### Standard Logging

```js
const logger = require('./src/middlewares/logger/pino');

logger.info('New user created: John Doe');
logger.warn('Failed to connect, trying again in 30 seconds');
logger.error('User not authenticated, does not exist in the database');
```
```
[10:09:50.127] INFO: New user created: John Doe
[10:09:51.128] WARN: Failed to connect, trying again in 30 seconds
[10:09:52.129] ERROR: User not authenticated, does not exist in the database
```

### Pino HTTP Logger
```js
const express = require('express');
const logger = require('./src/middlewares/logger/pino_http');

const app = express();
app.use(logger());

app.get('/', (req, res) => {
    req.log.info('Hello from Pino HTTP!');
    res.send('Hello World!');
});
 ```
 ```
[10:09:50.821] INFO: Hello from Pino HTTP!
    req: {
        "id": 1,
        "method": "GET",
        "url": "/",
        "query": {},
        "params": {},
        "headers": {
            "host": "localhost:8000",
            "connection": "keep-alive",
            ...
        },
        "remoteAddress": "::ffff:172.19.0.1",
        "remotePort": 53680
    }
[10:09:50.825] INFO: request completed
    req: {
        "id": 1,
        "method": "GET",
        "url": "/",
        "query": {},
        "params": {},
        "headers": {
            "host": "localhost:8000",
            "connection": "keep-alive",
            ...
        },
    }
    res: {
        "statusCode": 304,
        "headers": {
            "x-powered-by": "Express",
            "etag": "W/\"f-lUJQeG7euPMoXbhR4cqUYXcG4ec\""
        }
    }
    responseTime: 4
 ```
These types of logs can also use `warn` and `error` as well. There are other log types, but for our purposes, these will be the ones that will will use: `info`, `warn`, and `error`

Please take a look at the pino documentation for more information: https://getpino.io/

## Testing
For our testing, we will be using [Vitest](https://vitest.dev/)

### Folder and File Structure
Our `test` folder will follow the same structure as our `src` folder

```
src
  ├─ configs
  ├─ controllers
  ├─ middleware
  ├─ models
  ├─ routes
  ├─ services
  └─ utils
test
  ├─ services
  └─ utils
```

When creating a new file, name it the same as the existing file in `src` but with the extension `.test.js`

For example: ```src/services/user.js``` will have a test file of ```test/services/user.test.js```

### Creating a Test

This is a simple example for using Vitest

```js
import { test, expect } from 'vitest';

test('1 + 1 = 2', () => {
  expect(1 + 1).toBe(2);
});
```

Here is an example for creating a test for an HTTP request

```js
import { test, expect } from 'vitest';
import { get } from 'axios';

test('GET /api/users', async () => {
  const response = await get('http://localhost:8000/api/users');
  expect(response.status).toBe(200);
});
```

This one is only checking the response status, but in practice, we also want to check our response body. This will be left to you to learn more about. *Mocking will be key*

### Running Tests

To run our tests, we will be using [Vitest](https://vitest.dev/)

To run all tests, run the following command:
```
npm run test
```

To run a specific test file, run the following command:
```
npm run test -- -f <file name>
```

Please take a look at the Vitest documentation for more information: http://vitest.dev/
