define(function() {
    "use strict";
    var AppModel = function() {
        this._focusIndex = -1;
    };

    AppModel.prototype = {
        getFocusIndex: function() {
            return this._focusIndex;
        },

        setFocusIndex: function(index) {
            this._focusIndex = index;
        }
    };

    return AppModel;
});
