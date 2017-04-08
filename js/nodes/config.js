define([
    'jquery',
    'core',
    'core.data',
    'core.interface'
], function ($, core, data, interface) {

    var config = {
        options: {},

        init: function() {
            var self = this;
            console.log("config init started");

            core.init();

            $(window).on("csub-dataready", $.proxy(this.onDataReady, self));
        },

        onDataReady: function () {
            this.createForms();
            //this.restoreOptions();
        },

        createForms: function () {
            for( var i = 0; i < data.folders.length; i++) {
                $block = $('<tr></tr>').appendTo($('#folderImages'));
                interface.insertTableCell($block, "title", data.folders[i].title);
                $imgcell = interface.insertTableCell($block, "image", "");
                interface.insertTextField($imgcell, 'folderImg-' + data.folders[i].id, 'Image link');
            }
        },

        restoreOptions: function () {
            var self = this;

            chrome.storage.sync.get({
                folderImages : false
            }, function(items) {
                self.options = items;
                self.updateForm();
            });
        },

        updateForm: function () {
            var self = this,
                folders = data.folders;

            folders.forEach(function() {
                body.append('<input type="text" />')
            });
        }
    }

    $(document).ready(function() {
        config.init();
    });

    return config;
});