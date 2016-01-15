'use strict';

define('config/app', [], function () {
    "use strict";

    var config = {
        // I dislike this name...
        videosPerSet: 5
    };

    return {
        getVideosPerSet: function getVideosPerSet() {
            return config.videosPerSet;
        }
    };
});

define('genres/genreController', ["config/app"], function (AppConfig) {

    var GenreController = function GenreController(model, view) {
        this._model = model;
        this._view = view;

        this._boundHandleVideoSwitch = this._handleVideoSwitch.bind(this);
    };

    GenreController.prototype = {
        _bindEvents: function _bindEvents() {
            document.addEventListener("keyup", this._boundHandleVideoSwitch);
        },

        _unbindEvents: function _unbindEvents() {
            document.removeEventListener("keyup", this._boundHandleVideoSwitch);
        },

        _handleVideoSwitch: function _handleVideoSwitch(event) {
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

        setVideoFocusByDelta: function setVideoFocusByDelta(delta) {
            this._model.setFocusIndex(this._model.getFocusIndex() + delta);
        },

        setFocus: function setFocus(isFocused, focusModulo) {
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

        render: function render() {
            this._view.render({
                isFocused: this._model.isFocused(),
                focusIndex: this._model.getFocusIndex()
            });
        },

        getFocusIndex: function getFocusIndex() {
            return this._model.getFocusIndex();
        },

        getFocusElement: function getFocusElement() {
            return this._view.getFocusElement();
        }
    };

    return GenreController;
});

define('genres/genreModel', [], function () {
    "use strict";

    var GenreModel = function GenreModel() {
        this._focus = false;
        this._focusIndex = 0;
    };

    GenreModel.prototype = {
        setFocus: function setFocus(isFocused) {
            this._focus = isFocused;
        },

        isFocused: function isFocused() {
            return this._focus;
        },

        setFocusIndex: function setFocusIndex(index) {
            this._focusIndex = index;
        },

        getFocusIndex: function getFocusIndex() {
            return this._focusIndex;
        }
    };

    return GenreModel;
});

define('helpers/ArrayHelpers', [], function () {
    "use strict";

    return {

        toArray: function toArray(arrayLikeStruct) {
            return Array.prototype.slice.call(arrayLikeStruct);
        }
    };
});

define('genres/genreView', ["helpers/ArrayHelpers"], function (ArrayHelpers) {

    var GENRE_VIDEO_FOCUSED_CLASS = "focused";

    var GENRE_VIDEO_SELECTOR = ".genre-video";
    var GENRE_VIDEO_FOCUS_SELECTOR = GENRE_VIDEO_SELECTOR + "." + GENRE_VIDEO_FOCUSED_CLASS;

    var GenreView = function GenreView(el) {
        this._el = el;
    };

    GenreView.prototype = {
        render: function render(viewModel) {
            if (viewModel.isFocused) {
                var genreVideos = ArrayHelpers.toArray(this._el.querySelectorAll(GENRE_VIDEO_SELECTOR));

                genreVideos.forEach(function (genreVideoEl, index) {
                    if (index === viewModel.focusIndex) {
                        genreVideoEl.classList.add(GENRE_VIDEO_FOCUSED_CLASS);
                    } else {
                        genreVideoEl.classList.remove(GENRE_VIDEO_FOCUSED_CLASS);
                    }
                });
            } else {
                var focusEl = this._el.querySelector(GENRE_VIDEO_FOCUS_SELECTOR);

                if (focusEl) {
                    focusEl.classList.remove(GENRE_VIDEO_FOCUSED_CLASS);
                }
            }
        },

        getFocusElement: function getFocusElement() {
            return this._el;
        }
    };

    return GenreView;
});

define('genres/genreControllerFactory', ["genres/genreController", "genres/genreModel", "genres/genreView"], function (GenreController, GenreModel, GenreView) {
    return {
        get: function get(el) {
            var model = new GenreModel();
            var view = new GenreView(el);
            return new GenreController(model, view);
        }
    };
});

define('helpers/elementHelpers', [], function () {
    "use strict";

    return {
        getOffset: function getOffset(el) {
            var node = el;
            var left = 0;
            var top = 0;

            while (node.offsetLeft) {
                left += node.offsetLeft;
                top += node.offsetTop;

                node = node.parentNode;
            }

            return {
                left: left, top: top
            };
        }
    };
});

define('helpers/arrayHelpers', [], function () {
    "use strict";

    return {

        toArray: function toArray(arrayLikeStruct) {
            return Array.prototype.slice.call(arrayLikeStruct);
        }
    };
});

define('app/appController', ["genres/genreControllerFactory", "helpers/elementHelpers", "helpers/arrayHelpers", "config/app"], function (GenreControllerFactory, ElementHelpers, ArrayHelpers, AppConfig) {
    "use strict";

    var AppController = function AppController(model) {
        this._model = model;

        this._genreControllers = [];

        this._initGenreControllers();
        this._bindEvents();
    };

    AppController.prototype = {
        _initGenreControllers: function _initGenreControllers() {
            var self = this;
            var genreList = ArrayHelpers.toArray(document.querySelectorAll(".genre"));

            genreList.forEach(function (genreEl) {
                var genreController = GenreControllerFactory.get(genreEl);
                self._genreControllers.push(genreController);
            });
        },

        _bindEvents: function _bindEvents() {
            document.addEventListener("keyup", this._handleGenreSwitch.bind(this), false);
        },

        _handleGenreSwitch: function _handleGenreSwitch(event) {
            event.preventDefault();
            console.log(event);

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

        setGenreFocusByDelta: function setGenreFocusByDelta(delta) {
            var oldIndex = this._model.getFocusIndex();
            var newIndex = this._calculateFocusIndex(delta, this._genreControllers.length);

            if (oldIndex !== newIndex) {
                this._model.setFocusIndex(newIndex);

                var oldFocus = this._genreControllers[oldIndex];
                var newFocus = this._genreControllers[newIndex];
                var oldFocusIndex;

                if (oldFocus) {
                    oldFocus.setFocus(false);
                    oldFocusIndex = oldFocus.getFocusIndex();
                }

                if (newFocus) {
                    var oldFocusModulo = typeof oldFocusIndex !== "undefined" ? oldFocusIndex % AppConfig.getVideosPerSet() : 0;
                    newFocus.setFocus(true, oldFocusModulo);
                    this._focusGenre(newFocus.getFocusElement());
                }
            }
        },

        _calculateFocusIndex: function _calculateFocusIndex(delta) {
            var index = this._model.getFocusIndex() + delta;
            var arrayLength = this._genreControllers.length;

            if (index >= arrayLength) {
                index = arrayLength - 1;
            } else if (index < 0) {
                index = 0;
            }

            return index;
        },

        _focusGenre: function _focusGenre(el) {
            var position = ElementHelpers.getOffset(el);
            var height = el.clientHeight;
            var scrollPosition = window.scrollY;
            var windowHeight = window.innerHeight;

            if (position.top < scrollPosition || position.top + height >= scrollPosition + windowHeight) {
                window.scrollTo(0, position.top);
            }
        }
    };

    return AppController;
});

define('app/appModel', [], function () {
    "use strict";

    var AppModel = function AppModel() {
        this._focusIndex = -1;
    };

    AppModel.prototype = {
        getFocusIndex: function getFocusIndex() {
            return this._focusIndex;
        },

        setFocusIndex: function setFocusIndex(index) {
            this._focusIndex = index;
        }
    };

    return AppModel;
});

define('app/appControllerFactory', ["app/appController", "app/appModel"], function (AppController, AppModel) {
    "use strict";

    return {
        get: function get() {
            return new AppController(new AppModel());
        }
    };
});

require(["app/appControllerFactory"], function (AppControllerFactory) {

    var app = AppControllerFactory.get();

    // lazy load additional genres
});

define("main", function () {});
