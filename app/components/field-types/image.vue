<template>
    <div>
        <div class="uk-align-left">
            <img width="50" :src="imageSrc">
        </div>
        <div uk-form-custom="target: true">
            <input type="file" :id="id">
            <button class="uk-button uk-button-default" type="button" tabindex="-1">Select</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            required: true
        },
        imageSrc: {
            type: String
        }
    }
}
</script>
