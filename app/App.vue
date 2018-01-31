<template>
    <div>
        <div class="uk-background-secondary uk-light uk-padding-small uk-margin-large-bottom">
            <div class="uk-container">
                <div class="uk-flex-middle" uk-grid>
                    <div class="uk-width-expand">
                        <h1 class="uk-margin-remove-bottom uk-h4">Bookmarks</h1>
                    </div>
                    <div class="uk-width-1-4 uk-text-right">
                        <form class="uk-search uk-search-default">
                            <a href="" class="uk-search-icon-flip" uk-search-icon></a>
                            <input class="uk-search-input" type="search" placeholder="Search...">
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <folders-list :folders="folders"></folders-list>
    </div>
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
