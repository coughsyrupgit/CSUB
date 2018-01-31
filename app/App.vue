<template>
    <folders-list :folders="folders"></folders-list>
</template>

<script>
import foldersList from "./components/folders.vue";
import {data, dataModel} from "./model/treedata.js";

dataModel.getTree();

export default {
    data() {
        return data;
    },
    /*computed: {
        folders: function () {
            return data.folders
        },
        links: function () {
            return data.links
        }
    },*/
    components: {
        foldersList
    }
}
</script>
