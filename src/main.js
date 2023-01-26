import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import '@/assets/style/common.less'
import UI from "@/components/library"
// import "less-loader"

createApp(App).use(router).use(store).use(UI).mount('#app')
