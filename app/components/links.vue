<template>
    <ul class="uk-list uk-list-striped uk-nav" v-if="links.length">
        <li 
            is="link-item"
            v-for="link in links"
            :key="link.id"
            :link="link"></li>
    </ul>
</template>

<script>
import linkItem from "./link.vue";

export default {
    props: {
        links : {
            type: Array,
            required: true
        }
    },
    components: {
        linkItem
    }
}
</script>
