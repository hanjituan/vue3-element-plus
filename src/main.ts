import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import 'virtual:windi.css'
import router from './router'
import 'animate.css';

const app = createApp(App)
app.use(router)

app.use(ElementPlus)
app.mount('#app')
