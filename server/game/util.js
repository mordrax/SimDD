/**
 * Non game related utility functions
 */
(function (util) {
    'use strict';
    /**
     * returns a random double between low and high
     */
    util.randReal = function randReal(low, high) {
        return Math.random() * (high - low) + low;
    };

    /**
     * Returns a random integer between low and high
     */
    util.rand = function rand(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    };
})(module.exports);
