define([
    'jquery',
    'core',
    'core.data',
    'core.interface'
], function ($, core, data, interface) {

    var mainW = {
        containerBlock:     "#bookmarksTree",
        folders:            [],

        init: function () {
            var self = this;

            core.init();

            self.$folderWrap = $(self.folderBlock).attr("id", "");
            self.$container = $(self.containerBlock).attr("id", "");

            if (!data.isTreeReady) {
                $(window).on('csub-dataready', $.proxy(self.onTreeReady, self));
            } else {
                self.onTreeReady();
            }
        },

        onTreeReady: function () {
            var self = this;

            data.folders.forEach(function(val, i, arr) {
                var $block = $(interface.cardHtml).appendTo(self.$container);
                $block.find('.mdl-card__media').html(val.title);
            });
        }
    }

    $(document).ready(function () {
        mainW.init();
    });

    return false;
})