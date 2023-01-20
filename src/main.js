import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import '@/assets/style/common.less'
// import "less-loader"

createApp(App).use(router).use(store).mount('#app')
