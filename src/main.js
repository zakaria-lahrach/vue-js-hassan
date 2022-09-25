import { createApp } from 'vue'
import App from './App.vue'
var cors = require('cors')

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "./assets/Global.css"

import axios from 'axios'
axios.defaults.baseURL = "http://localhost/php_crud_vuejs"

// axios.defaults.headers.get['Accepts'] = 'application/json';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Access-Control-Allow-Methods'] =  'HEAD, GET, POST, PUT, DELETE';
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

createApp(App).use(cors).mount('#app')
