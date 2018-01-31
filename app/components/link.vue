<template>
    <li>
        <a class="uk-link" :href="link.url">
            <img class="uk-margin-small-right" :src="'chrome://favicon/' + link.url"/>
            {{ link.title }}
        </a>
    </li>
</template>

<script>
export default {
    props: {
        link: {
            type: Object,
            required: true
        }
    }
}
</script>
