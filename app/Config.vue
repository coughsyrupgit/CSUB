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
                <div class="uk-width-3-4">
                    <ul class="uk-switcher" id="configTabsContent">
                        <li class="uk-form uk-form-stacked">
                            <form-fieldset legend="Background">
                                <form-field forid="cs-global-background">
                                    <field-image id="cs-global-background" :image-src="global.background"></field-image>
                                </form-field>
                            </form-fieldset>
                        </li>
                        <li class="uk-form uk-form-stacked">
                            <form-fieldset legend="Folders">
                            </form-fieldset>
                        </li>
                    </ul>
                    <button class="uk-button uk-button-primary uk-margin-top" @click="saveConfig">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ConfigNav from "./components/configure/navigation.vue";
import configModel from "./model/config.js";
import FormFieldset from "./components/fieldset.vue";
import FormField from "./components/field.vue"
import FieldImage from "./components/field-types/image.vue"

export default {
    data() {
        return configModel.options
    },
    methods: {
        saveConfig: function () {
            configModel.set();
        }
    },
    components: {
        ConfigNav,
        FormFieldset,
        FormField,
        FieldImage
    }
}

console.log(configModel.options)
</script>
