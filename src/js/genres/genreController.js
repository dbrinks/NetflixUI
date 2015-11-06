define([
    "config/app"
], function(
    AppConfig
) {

    var GenreController = function(model, view) {
        this._model = model;
        this._view = view;

        this._boundHandleVideoSwitch = this._handleVideoSwitch.bind(this);
    };

    GenreController.prototype = {
        _bindEvents: function() {
            document.addEventListener("keyup", this._boundHandleVideoSwitch);
        },

        _unbindEvents: function() {
            document.removeEventListener("keyup", this._boundHandleVideoSwitch);
        },

        _handleVideoSwitch: function(event) {
            event.preventDefault();

            // can also do page up/down for steps of N
            switch (event.keyCode) {
                case 37:
                    this.setVideoFocusByDelta(-1);
                    this.render();
                    break;
                case 39:
                    this.setVideoFocusByDelta(1);
                    this.render();
                    break;
                default:
                    // do nothing
                    break;
            }
        },

        setVideoFocusByDelta: function(delta) {
            this._model.setFocusIndex(this._model.getFocusIndex() + delta);
        },

        setFocus: function(isFocused, focusModulo) {
            this._model.setFocus(isFocused);

            if (isFocused) {
                this._bindEvents();
                var currentModulo = this._model.getFocusIndex() % AppConfig.getVideosPerSet();

                this.setVideoFocusByDelta(focusModulo - currentModulo);
            } else {
                this._unbindEvents();
            }

            this.render();
        },

        render: function() {
            this._view.render({
                isFocused: this._model.isFocused(),
                focusIndex: this._model.getFocusIndex(),
            });
        },

        getFocusIndex: function() {
            return this._model.getFocusIndex();
        },

        getFocusElement: function() {
            return this._view.getFocusElement();
        }
    };

    return GenreController;
});
