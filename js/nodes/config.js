define([
    'jquery',
    'core',
    'core.data',
    'core.interface'
], function ($, core, data, interface) {

    var config = {
        syncOptions: {},
        localOptions: {},
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
                links       : []
            }, function(items) {
                self.syncOptions = items;
                self.updateForm();
            });

            chrome.storage.local.get(null, function (items) {
                self.localOptions = items;
                self.updateForm();
            });
        },

        updateForm: function () {
            var self = this;

            var folders = self.syncOptions.folders;

            if (folders.length != 0) {
                folders.forEach(function(folder, i, arr) {
                    $('#folderImg-' + folder.image.id).val(folder.image.src);
                });
            }

            if (self.localOptions.bgImage) {
                $('#globalBgImgPreview').attr("src", self.localOptions.bgImage);
            }
        },

        setOptions: function () {
            var self = this;

            self.syncOptions.folders = [];
            $('.folder-img-input').find('input').each(function() {
                var $this = $(this);

                if ($this.val() !== "") {
                    var elem = new self.folder.image($this.data('folder-id'), $this.val()),
                        folder = {
                            id: $this.data('folder-id'),
                            image: elem
                        }

                    self.syncOptions.folders.push(folder);
                }
            });

            var globalBgImg = $('#globalBgImg')[0].files[0];

            if (globalBgImg) {
                var reader = new FileReader();
                reader.readAsDataURL(globalBgImg);
                reader.onload = function (event) {
                    self.localOptions.bgImage = event.target.result;
                    chrome.storage.local.clear(function () {
                        chrome.storage.local.set(self.localOptions, function () {
                            console.log('------------------------\n',self.localOptions,'\n------------------------');
                        });
                    });
                }
            }

            //console.log('------------------------\n',$('#globalBgImgFile')[0].files[0],'\n------------------------');

            chrome.storage.sync.clear(function () {
                chrome.storage.sync.set(self.syncOptions);
            });
            

            self.restoreOptions();
        }
    }

    $(document).ready(function() {
        config.init();
    });

    return config;
});
