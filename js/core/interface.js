define([
    'jquery',
    'core.data'
], function ($, data) {
    var interface = {

        init: function() {
            var self = this;

            console.log("core.interface init started");
            $(window).on('csub-dataready', $.proxy(self.onDataReady, self));
        },

        onDataReady: function() {
            var bgImage = data.config.globals.globalBgImg;

            if (bgImage && $('body').hasClass('with-background')) {
                $('body').css({"background-image" : "url('" + bgImage + "')"});
            }
        },

        insertCard: function(container, classes, title, img = false) {
            if (img) {
                return $('<div class="uk-width-1-2@m uk-width-1-3@l ' + classes + '"><div class="uk-card uk-card-small uk-card-default uk-card-hover"><div class="uk-card uk-card-small uk-card-default"><div class="uk-grid-small uk-flex-middle" uk-grid><div class="uk-width-auto"><img src="' + img + '" alt="' + title + '"></div>' + '<div class="uk-width-expand"><h3 class="uk-card-title">' + title + '</h3></div></div></div><div class="uk-card-body"><ul class="uk-list uk-list-striped uk-nav folder-links"></ul></div></div></div>').appendTo(container);
            } else {
                return $('<div class="uk-width-1-2@m uk-width-1-3@l ' + classes + '"><div class="uk-card uk-card-small uk-card-default uk-card-hover"><div class="mdl-card__media no-img">' + '<div class="uk-card-header"><h3 class="uk-card-title">' + title + '</h3></div>' + '</div><div class="uk-card-body"><ul class="uk-list uk-list-striped uk-nav folder-links"></ul></div></div></div>').appendTo(container);
            }
            
        },

        insertChip: function(container, classes, link, icon, text) {
            return $('<li><a class="uk-link ' + classes + '" href="' + link + '">' + text + '</a></li>').appendTo(container);
        },

        insertTextField: function(container, classes, id, attributes, label) {
            return $('<div class="uk-width-1-2 ' + classes + '"><label class="uk-form-label" for="' + id + '">' + label + '</label><input class="uk-input" type="text" id="' + id + '" ' + attributes + '></div>').appendTo(container);
        },

        insertTableCell: function(container, classes, content) {
            return $('<td class="' + classes + '">' + content + '</td>').appendTo(container);
        }
    }

    return interface;
});
