import 'uikit/dist/css/uikit.min.css'
import 'uikit/dist/js/uikit.min.js'
import 'uikit/dist/js/uikit-icons.min.js'
import Vue from 'vue'
import Config from './Config.vue'
import configModel from './model/config.js'

let root = document.createElement('div');

root.id = 'config';
document.body.appendChild(root);

new Vue({
    el: "#config",
    render: h => h(Config)
})
