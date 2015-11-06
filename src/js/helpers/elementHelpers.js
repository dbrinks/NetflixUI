define(function() {
    "use strict";

    return {
        getOffset: function(el) {
            var node = el;
            var left = 0;
            var top = 0;

            while (node.offsetLeft) {
                left += node.offsetLeft;
                top += node.offsetTop;

                node = node.parentNode;
            }

            return {
                left, top
            };
        }
    };
});
