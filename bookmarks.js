var CSUB = {
    markup : {
        blocks: {
            grid: '<div class="mdl-grid"></div>',
            cell: '<div class="mdl-cell"></div>',
            card: '<div class="mdl-card mdl-shadow--2dp"><div class="mdl-card__media"></div><div class="mdl-card__actions"><ul class="folder-links"></ul></div></div>',
            chip: '<li><a class="mdl-chip mdl-chip--contact" href="#"><span class="chip-icon mdl-chip__contact mdl-color--primary mdl-color-text--white"></span><span class="mdl-chip__text"></span></a></li>'
        },
        classes: {
            linksList:  'folder-links',
            cardMedia:  'mdl-card__media',
            chip:       'mdl-chip',
            chipText:   'mdl-chip__text',
            chipIcon:   'chip-icon'
        }
    },

    init: function() {
        chrome.bookmarks.getTree($.proxy(this.onTreeReady, this));
    },

    onTreeReady: function(tree) {
        var self = this,
            $main = $('#bookmarksTreeCompact'),
            $node = $main;
            topFolders = tree[0].children[0].children;

        if (topFolders.length) {
            var $container = $(self.markup.blocks.grid).appendTo($node);
            topFolders.forEach(function(folder, index, array) {
                if (typeof (folder.url) == 'undefined') { //show only folders
                    var links = folder.children;
                    $node = $container;
                    $node = $(self.markup.blocks.cell).appendTo($node);
                    $node = $(self.markup.blocks.card).appendTo($node);
                    $node.find('.' + self.markup.classes.cardMedia).append(folder.title);
                    if (links.length) {
                        var $linksList = $node.find('.' + self.markup.classes.linksList);
                        links.forEach(function(link, index, array) {
                            $node = $(self.markup.blocks.chip).appendTo($linksList);
                            $node.find('.' + self.markup.classes.chip).attr('href', link.url)
                                .children('.' + self.markup.classes.chipIcon).html(link.title.charAt(0))
                                .siblings('.' + self.markup.classes.chipText).html(link.title);
                        });
                    }
                }
            });
        }
        console.log(topFolders);
    }
}

document.addEventListener('DOMContentLoaded', function () {
  CSUB.init();
});