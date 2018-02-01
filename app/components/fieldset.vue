<template>
    <fieldset class="uk-fieldset">
        <legend class="uk-legend">{{ legend }}</legend>
        <slot></slot>
    </fieldset>
</template>

<script>
export default {
    props: [
        'legend'
    ]
}
</script>
