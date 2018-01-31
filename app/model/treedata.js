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

let data = {
    folders: []
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
