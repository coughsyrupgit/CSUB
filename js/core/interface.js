define([
    'jquery',
    'material'
], function ($, ko) {
    var interface = {

        init: function() {
            console.log("core.interface init started");
        },

        insertCard: function(container, classes, title) {
            return $('<div class="mdl-cell mdl-cell--4-col mdl-cell--6-col-table ' + classes + '"><div class="mdl-card mdl-shadow--2dp"><div class="mdl-card__media">' + title + '</div><div class="mdl-card__actions"><ul class="folder-links"></ul></div></div></div>').appendTo(container);
        },

        insertChip: function(container, classes, link, icon, text) {
            return $('<li><a class="mdl-chip mdl-chip--contact ' + classes + '" href="' + link + '"><span class="mdl-chip__contact mdl-color--primary mdl-color-text--white">' + icon + '</span><span class="mdl-chip__text">' + text + '</span></a></li>').appendTo(container);
        },

        insertTextField: function(container, id, label) {
            return $('<div class="mdl-textfield mdl-js-textfield"><input class="mdl-textfield__input" type="text" id="' + id + '"><label class="mdl-textfield__label" for="' + id + '">' + label + '</label></div>').appendTo(container);
        },

        insertTableCell: function(container, classes, content) {
            return $('<td class="mdl-data-table__cell--non-numeric' + classes + '">' + content + '</td>').appendTo(container);
        }
    }

    return interface;
});