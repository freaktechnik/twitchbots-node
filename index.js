/**
 * Ready to use node.js module for the twitchbots.info API.
 * @author Martin Giger
 * @license MIT
 * @module twitchbots-node
 */
"use strict";

const TwitchBots = require("twitchbots-base"),
    fetch = require("node-fetch"),

    requestWrapper = (url) => {
        return fetch(url).then((res) => {
            if(res.ok) {
                return res.json();
            }
            else {
                throw {
                    code: res.status,
                    text: res.statusText
                };
            }
        }, (error) => {
            error.code = 0;
            throw error;
        });
    };

module.exports = new TwitchBots({
    request: requestWrapper
});
