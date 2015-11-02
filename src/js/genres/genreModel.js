define(function() {
    "use strict";

    var GenreModel = function() {
        this._focus = false;
        this._focusIndex = 0;
    };

    GenreModel.prototype = {
        setFocus: function(isFocused) {
            this._focus = isFocused;
        },

        isFocused: function() {
            return this._focus;
        },

        setFocusIndex: function(index) {
            this._focusIndex = index;
        },

        getFocusIndex: function() {
            return this._focusIndex;
        }
    };

    return GenreModel;
});
