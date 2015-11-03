define(function() {
    "use strict";

    var config = {
        // I dislike this name...
        videosPerSet: 5
    };

    return {
        getVideosPerSet: function() {
            return config.videosPerSet;
        }
    };
});
