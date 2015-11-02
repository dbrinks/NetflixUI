define(function() {
    "use strict";

    return {
        toArray: function(arrayLikeStruct) {
            return Array.prototype.slice.call(arrayLikeStruct);
        }
    };
});
