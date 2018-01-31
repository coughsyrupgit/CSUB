<template>
    <div class="uk-container">
        <div class="uk-grid-match uk-margin-large-bottom" uk-grid v-if="folders.length">
            <folder v-for="folder in folders"
                :key="folder.id"
                :folder="folder"
                v-if="!folder.isEmpty"></folder>
        </div>
    </div>
</template>

<script>
import folder from './folder.vue'

export default {
    props: [
        'folders'
    ],
    components: {
        folder
    }
}
</script>
