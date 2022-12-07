# Logger README

### How to configure the the logger for your files

Add these imports

```
const path = require("path");
const { error, warn, info, http, verbose, debug } = require("./logger")
    (path.join(__dirname, "logs"));
```

Example usage:

```
error("Error message");
warn("Warning message");
info("Info message");
http("HTTP message");
verbose("Verbose message");
debug("Debug message");
```
