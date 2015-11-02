define([
    "helpers/ArrayHelpers"
], function(
    ArrayHelpers
) {

    var GENRE_VIDEO_FOCUSED_CLASS = "focused";

    var GENRE_VIDEO_SELECTOR = ".genre-video";
    var GENRE_VIDEO_FOCUS_SELECTOR = GENRE_VIDEO_SELECTOR + "." + GENRE_VIDEO_FOCUSED_CLASS;

    var GenreView = function(el) {
        this._el = el;
    };

    GenreView.prototype = {
        render: function(viewModel) {
            if (viewModel.isFocused) {
                var genreVideos = ArrayHelpers.toArray(this._el.querySelectorAll(GENRE_VIDEO_SELECTOR));

                genreVideos.forEach(function(genreVideoEl, index) {
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

        getFocusElement: function() {
            return this._el;
        }
    };

    return GenreView;
});
