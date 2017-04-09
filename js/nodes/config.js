define([
    'jquery',
    'core',
    'core.data',
    'core.interface'
], function ($, core, data, interface) {

    var config = {
        options: {},
        folder: {
            id : 0,
            image: function (id, src) {
                this.id = id;
                this.src = src;
            }
        },

        init: function() {
            var self = this;
            console.log("config init started");

            core.init();

            $(window).on("csub-dataready", $.proxy(this.onDataReady, self));
            $('#configSubmit').on('click', $.proxy(this.setOptions, self));
        },

        onDataReady: function () {
            this.createForms();
            this.restoreOptions();
        },

        createForms: function () {
            data.folders.forEach(function(val, i, arr) {
                $block = $('<tr></tr>').appendTo($('#folderImages'));
                interface.insertTableCell($block, "title", val.title);
                $imgcell = interface.insertTableCell($block, "image", "");
                interface.insertTextField($imgcell, 'folder-img-input', 'folderImg-' + val.id, 'data-folder-id="' + val.id + '"', ' Image link');
            });
        },

        restoreOptions: function () {
            var self = this;

            chrome.storage.sync.get({
                folders     : [],
                links       : [],
                globals      : {
                    globalBgImg : false
                },
            }, function(items) {
                self.options = items;
                self.updateForm();
            });
        },

        updateForm: function () {
            var self = this;

            var folders = self.options.folders;

            if (folders.length != 0) {
                folders.forEach(function(folder, i, arr) {
                    $('#folderImg-' + folder.image.id).val(folder.image.src);
                });
            }

            var globals = self.options.globals;
            if (globals.globalBgImg) {
                $('#globalBgImg').val(globals.globalBgImg);
            }
        },

        setOptions: function () {
            var self = this;

            self.options.folders = [];
            $('.folder-img-input').find('input').each(function() {
                var $this = $(this);

                if ($this.val() !== "") {
                    var elem = new self.folder.image($this.data('folder-id'), $this.val()),
                        folder = {
                            id: $this.data('folder-id'),
                            image: elem
                        }

                    self.options.folders.push(folder);
                }
            });

            var globalBgImg = $('#globalBgImg').val();

            if (globalBgImg != "" ) {
                self.options.globals.globalBgImg = globalBgImg;
            }

            chrome.storage.sync.clear(function () {
                chrome.storage.sync.set(self.options);
            });
        }
    }

    $(document).ready(function() {
        config.init();
    });

    return config;
});