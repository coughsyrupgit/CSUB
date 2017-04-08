define([
    'jquery',
    'material'
], function ($, ko) {
    var interface = {
        cardHtml : '<div class="mdl-cell mdl-cell--4-col mdl-cell--6-col-table"><div class="mdl-card mdl-shadow--2dp"><div class="mdl-card__media"><div class="mdl-card__actions"></div><ul class="folder-links"></ul></div></div></div>',
        chipHtml : '<a class="mdl-chip mdl-chip--contact"><span class="mdl-chip__contact mdl-color--primary mdl-color-text--white"></span><span class="mdl-chip__text"></span></a>',

        init: function() {
            console.log("core.interface init started");
        }
    }

    return interface;
});