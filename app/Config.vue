<template>
    <div>
        <div class="uk-background-secondary uk-light uk-padding-small uk-margin-large-bottom">
            <div class="uk-container">
                <h1 class="uk-margin-remove-bottom uk-h4">Bookmarks Configuration</h1>
            </div>
        </div>
        <div class="uk-container uk-margin-large-bottom">
            <div class="uk-grid" uk-grid>
                <div class="uk-width-1-4@m">
                    <config-nav></config-nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ConfigNav from "./components/configure/navigation.vue";

export default {
    components: {
        ConfigNav   
    }
}
</script>
