define([
    "genres/genreControllerFactory",
    "helpers/elementHelpers",
    "helpers/arrayHelpers"
], function(
    GenreControllerFactory,
    ElementHelpers,
    ArrayHelpers
) {
    "use strict";

    var AppController = function(model) {
        this._model = model;

        this._genreControllers = [];

        this._initGenreControllers();
        this._bindEvents();
    };

    AppController.prototype = {
        _initGenreControllers: function() {
            var self = this;
            var genreList = ArrayHelpers.toArray(document.querySelectorAll(".genre"));

            genreList.forEach(function(genreEl) {
                var genreController = GenreControllerFactory.get(genreEl);
                self._genreControllers.push(genreController);
            });
        },

        _bindEvents: function() {
            document.addEventListener("keyup", this._handleGenreSwitch.bind(this));
        },

        _handleGenreSwitch: function(event) {
            event.preventDefault();

            // can also do page up/down for steps of N
            switch (event.keyCode) {
                case 38:
                    this.setGenreFocusByDelta(-1);
                    break;
                case 40:
                    this.setGenreFocusByDelta(1);
                    break;
                default:
                    // do nothing
                    break;
            }
        },

        setGenreFocusByDelta: function(delta) {
            var oldIndex = this._model.getFocusIndex();
            var newIndex = this._calculateFocusIndex(delta, this._genreControllers.length);

            if (oldIndex !== newIndex) {
                this._model.setFocusIndex(newIndex);

                var oldFocus = this._genreControllers[oldIndex];
                var newFocus = this._genreControllers[newIndex];

                if (oldFocus) {
                    oldFocus.setUnfocus();
                }

                if (newFocus) {
                    newFocus.setFocus();
                    this._focusGenre(newFocus.getFocusElement());
                }
            }
        },

        _calculateFocusIndex: function(delta) {
            var index = this._model.getFocusIndex() + delta;
            var arrayLength = this._genreControllers.length;

            if (index >= arrayLength) {
                index = arrayLength - 1;
            } else if (index < 0) {
                index = 0;
            }

            return index;
        },

        _focusGenre: function(el) {
            var position = ElementHelpers.getPosition(el);

            document.scrollingElement.scrollTop = position.top;
        }
    };

    return AppController;
});
