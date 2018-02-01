const FolderObject = function (treeNode) {
    let links = treeNode.children.filter(function (item) {
        return !item.children
    });

    return {
        id: treeNode.id,
        title: treeNode.title,
        isEmpty: (links.length) ? false : true,
        links: links
    }
}

let dataModel = {
    data: {
        folders: []
    },

    getTree: function (callback) {
        const self = this;

        chrome.bookmarks.getTree(function (tree) {
            self.prepareData.call(self, tree)
            if (callback && typeof callback === 'function') {
                callback(self.data)
            }
        });
    },

    prepareData: function (tree) {
        const self = this;
        
        tree.forEach(function(item, index) {
            if (item.children) {
                self.data.folders.push(new FolderObject(item))
                self.prepareData(item.children);
            }
        });
    }
}

export default dataModel
