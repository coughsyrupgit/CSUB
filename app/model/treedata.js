const FolderObject = function (treeNode) {
    return {
        id: treeNode.id,
        title: treeNode.title,
        isEmpty: (treeNode.children.filter(function (item) {
            return !item.children
        }).length) ? false : true
    }
}

let data = {
    folders: [],
    links: []
}

let dataModel = {
    
    getTree: function () {
        let self = this;

        chrome.bookmarks.getTree(function (tree) {
            self.prepareData.call(self, tree)
        });
    },

    prepareData: function (tree) {
        let self = this;
        
        tree.forEach(function(item, index) {
            if (item.children) {
                data.folders.push(new FolderObject(item))
                self.prepareData(item.children);
            }
        });
    }
}

export {data, dataModel}
