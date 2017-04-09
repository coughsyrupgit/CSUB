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

            data.folders.forEach(function(folder, i, arr) {
                var folderConfig = data.getFolderConfig(folder.id),
                    folderImg = (folderConfig) ? folderConfig.image.src : false;

                interface.insertCard(self.$container, "folder-" + folder.id, folder.title, folderImg);
            });

            data.links.forEach(function(val, i, arr) {
                var $container = $('.folder-' + val.parentId).find('.folder-links')
                    $block = interface.insertChip($container, "folder-" + val.id, val.url, val.title.charAt(0), val.title);
            });
        }
    }

    $(document).ready(function () {
        mainW.init();
    });

    return false;
})