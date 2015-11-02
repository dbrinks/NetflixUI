define(function() {
    "use strict";

    return {
        getPosition: function(el) {

            return el.getBoundingClientRect();
        }
    };
});
