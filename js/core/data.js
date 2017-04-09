define([
    'jquery'
], function ($) {

    var data = {
        isTreeReady         : false,
        isConfigReady       : false,
        folders             : [],
        links               : [],
        config              : {},

        init: function () {
            var self = this;

            console.log("core.data init started");
            chrome.bookmarks.getTree($.proxy(self.onTreeReady, self));
            $(window).on('csub-treeready', $.proxy(self.onReadyFires, self));
            $(window).on('csub-configready', $.proxy(self.onReadyFires, self));
            self.getConfig();
        },

        onTreeReady: function (tree) {
            this.divideByType(tree[0], 0);
        },

        onReadyFires: function () {
            var self = this;
            
            if (self.isTreeReady && self.isConfigReady) {
                $(window).trigger('csub-dataready');
            }
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
                this.isTreeReady = true;
                $(window).trigger('csub-treeready');
            }
        },

        getConfig: function () {
            var self = this;

            chrome.storage.sync.get({
                folders     : [],
                links       : []
            }, function(items) {
                self.config = items;
                self.isConfigReady = true;
                $(window).trigger('csub-configready');
            });
        },

        getFolderConfig: function (folderId) {
            var self = this;

            if (self.config.folders.length > 0) {
                var targets = self.config.folders.filter(function(elem) {
                    return elem.id == folderId;
                });
                if (targets.length > 0) {
                    return targets[0];
                }
            }

            return false;
        }
    }

    return data;
});