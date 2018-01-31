<template>
    <li>
        <a class="uk-link" :href="link.reference">
            <img class="uk-margin-small-right" :src="'chrome://favicon/' + link.reference"/>
            {{ link.label }}
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
