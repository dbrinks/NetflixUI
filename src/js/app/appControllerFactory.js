define([
    "app/appController",
    "app/appModel"
], function(
    AppController,
    AppModel
) {
    "use strict";

    return {
        get: function() {
            return new AppController(new AppModel());
        }
    };
});
