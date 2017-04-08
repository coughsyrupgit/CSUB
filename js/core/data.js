define([
    'jquery'
], function ($) {

    var data = {
        isTreeReady         : false,
        folders             : [],
        links               : [],

        init: function () {
            var self = this;

            console.log("core.data init started");
            chrome.bookmarks.getTree($.proxy(self.onTreeReady, self));
        },

        onTreeReady: function (tree) {
            this.isTreeReady = true;
            this.divideByType(tree[0], 0);
        },

        divideByType: function(node, iterator) {
            var self = this,
                element = {
                    id          : node.id,
                    title       : node.title,
                    parentId    : (typeof(node.parentId) !== "undefined") ? node.parentId : false,
                    index       : (typeof(node.index) !== "undefined") ? node.index : false,
                    url         : (typeof(node.url) !== "undefined") ? node.url : false
                };
                
            iterator++;
            if (typeof(node.children) !== "undefined") {
                if (element.id != 0) {
                    data.folders.push(element);
                }
                node.children.forEach(function(val, index, array) {
                    self.divideByType(val, iterator);
                }, self);
            } else {
                data.links.push(element);
            }
            if (--iterator == 0) {
                $(window).trigger('csub-dataready');
            }
        }
    }

    return data;
});