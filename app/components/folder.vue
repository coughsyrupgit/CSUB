<template>
    <div class="uk-width-1-2@m uk-width-1-3@l">
        <div class="uk-card uk-card-small uk-card-default uk-card-hover">
            <div class="uk-card-header" v-if="folder.image">
                <div class="uk-grid-small uk-flex-middle" uk-grid>
                    <div class="uk-width-auto">
                        <img alt="" class="uk-border-circle" width="40" height="40" v-bind:src="folder.image">
                    </div>
                    <div class="uk-width-expand">
                        <h3 class="uk-card-title">{{ folder.title }}</h3>
                    </div>
                </div>
            </div>
            <div class="uk-card-header" v-else>
                <h3 class="uk-card-title">{{ folder.title }}</h3>
            </div>
            <div class="uk-card-body">
                <links-list :links="folder.links"></links-list>
            </div>
        </div>
    </div>
</template>

<script>
import linksList from "./links.vue";

export default {
    props: {
        folder: {
            type: Object,
            required: true
        }
    },
    components: {
        linksList
    }
}
</script>
