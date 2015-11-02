define(function() {

    var GenreController = function(model, view) {
        this._model = model;
        this._view = view;
    };

    GenreController.prototype = {
        setFocus: function() {
            this._model.setFocus(true);

            this.render();
        },

        setUnfocus: function() {
            this._model.setFocus(false);
            this.render();
        },

        render: function() {
            this._view.render({
                isFocused: this._model.isFocused(),
                focusIndex: this._model.getFocusIndex(),
            });
        },

        getFocusElement: function() {
            return this._view.getFocusElement();
        }
    };

    return GenreController;
});
