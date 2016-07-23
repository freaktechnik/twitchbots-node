# twitchbots-node
[![Dependency Status](https://dependencyci.com/github/freaktechnik/twitchbots-node/badge)](https://dependencyci.com/github/freaktechnik/twitchbots-node)

Ready to use node.js module for the [twitchbots.info](https://twitchbots.info) API.

## Instalation
To add this module to your node project just run `npm install --save twitchbots-node`.

## Usage
```js
var twitchbots = require("twitchbots-node");

twitchbots.getBot("moobot").then(function(bot) {
    if(bot.isBot)
        console.log(bot.username, "is a bot");
    else
        console.log(bot.username, "is not a bot");
});
```

See [twitchbots-base](https://www.npmjs.com/package/twitchbots-base) for a
documentation of all methods available on the `twitchbots` object.

## License
This module is licensed under the MIT license.
