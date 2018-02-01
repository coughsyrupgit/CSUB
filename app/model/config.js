import dataModel from "./treedata";

const GlobalDefaults = function () {
    return [
        {
            background: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
        }
    ]
}
const FoldersDefaults = function(folders) {
    let result = [];

    folders.forEach(function(item) {
        let folderConfig = {
            id: item.id,
            image: ""
        }

        result.push(folderConfig)
    })

    return result
}

let config = {
    options: {},

    get: function (treedata) {
        const self = this;
        
        chrome.storage.local.get({
            global      : new GlobalDefaults(),
            folders     : new FoldersDefaults(treedata.folders)
        }, function(items) {
            self.options = items;
            console.log('------------------------\n',self.options,'\n------------------------');
        });
    },

    set: function () {
        console.log('------------------------\n','Save config','\n------------------------');
    }
}

let onDataReady = function (treedata) {
    config.get.call(config, treedata)
}

dataModel.getTree(onDataReady);

export default config;
