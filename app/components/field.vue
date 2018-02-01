<template>
    <div class="uk-margin">
        <label v-if="label" :for="forid" class="uk-form-label">{{ label }}</label>
        <slot></slot>
        <div v-if="note" class="uk-text-muted">{{ note }}</div>
        <div v-if="message" :text="'uk-text-' + message.type">{{ message.text }}</div>
    </div>
</template>

<script>
export default {
    props: {
        forid: {
            type: String,
            required: true
        },
        label: {
            type: String
        },
        note: {
            type: String
        },
        message: {
            type: Object
        }
    }
}
</script>
