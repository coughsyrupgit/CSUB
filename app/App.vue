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
    components: {
        foldersList
    }
}
</script>
