/**
 * Non game related utility functions
 */
(function (util) {
    'use strict';
    /**
     * Returns a random integer between low and high inclusive - I think...
     */
    util.rand = function rand(low, high) {
        return Math.random() * (high - low) + low;
    }
})(module.exports);
