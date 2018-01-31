<template>
    <ul class="uk-list uk-list-striped uk-nav">
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
    data() {
        return {
            links: [
                {
                    id: 0,
                    label: "Test Link",
                    reference: '#'
                },
                {
                    id: 1,
                    label: "Another Link",
                    reference: '#'
                }
            ]
        }
    },
    components: {
        linkItem
    }
}
</script>
