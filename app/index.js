import 'uikit/dist/css/uikit.min.css'
import 'uikit/dist/js/uikit.min.js'
import 'uikit/dist/js/uikit-icons.min.js'
import Vue from 'vue'
import App from './App.vue'

require.context("./static/", true, /^\.\/.*\.json/);

Vue.config.productionTip = false;

let root = document.createElement('div');

root.id = 'app';
document.body.appendChild(root);

new Vue({
    el: "#app",
    render: h => h(App)
})
