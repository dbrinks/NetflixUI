define([
    "genres/genreController",
    "genres/genreModel",
    "genres/genreView"
], function(
    GenreController,
    GenreModel,
    GenreView
) {
    return {
        get: function(el) {
            var model = new GenreModel();
            var view = new GenreView(el);
            return new GenreController(model, view);
        }
    };
});
