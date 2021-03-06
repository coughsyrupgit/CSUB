var CSUB = {
    markup : {
        blocks: {
            grid: '<div class="mdl-grid"></div>',
            cell: '<div class="uk-width-1-2@m uk-width-1-3@l"></div>',
            card: '<div class="uk-card uk-card-default"><div class="uk-card-header"></div><div class="uk-card-body"></div></div>',
            chip: '<li><a class="uk-link-text" href="#"></a></li>'
        },
        classes: {
            linksList:  'folder-links',
            chip:       'uk-link-text'
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
                    //$node.find('.' + self.markup.classes.cardMedia).append(folder.title);
                    if (links.length) {
                        var $linksList = $node.find('.' + self.markup.classes.linksList);
                        links.forEach(function(link, index, array) {
                            if (typeof(link.url) != "undefined" )
                            $node = $(self.markup.blocks.chip).appendTo($linksList);
                            $node.find('.' + self.markup.classes.chip).attr('href', link.url)
                                //.children('.' + self.markup.classes.chipIcon).html(link.title.charAt(0))
                                .html(link.title);
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
