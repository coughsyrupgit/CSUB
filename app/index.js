import 'uikit/dist/css/uikit.min.css'
import 'uikit/dist/js/uikit.min.js'
import 'uikit/dist/js/uikit-icons.min.js'
import Vue from 'vue'
import App from './App.vue'

// model

// components

Vue.config.productionTip = false;

new Vue({
    el: "#bookmarksTree",
    render: h => h(App)
})
