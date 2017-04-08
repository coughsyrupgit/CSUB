define([
    'jquery',
    'core',
    'core.data'
], function ($, core, data) {

    var config = {
        options: {},

        init: function() {
            var self = this;

            core.init();

            $(window).on("csub-dataready", $.proxy(this.onDataReady, self));
            console.log("config inited");
        },

        onDataReady: function () {
            this.restoreOptions();
        },

        restoreOptions: function () {
            var self = this;

            chrome.storage.sync.get({
                folderImages : false
            }, function(items) {
                self.options = items;
                //self.updateForm();
            });
        },

        /*updateForm: function () {
            var self = this,
                folders = data.bookmarksTree[0].children[0].children;

            folders.forEach(function (item, i, array) {
               //render the fields
            });

            console.log(data.bookmarksTree[0].children[0]);
        }*/
    }

    $(document).ready(function() {
        config.init();
    });

    return config;
});