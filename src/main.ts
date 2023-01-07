import { createApp } from 'vue'
import { Quasar, Notify } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'


const myApp = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
myApp.use(pinia)
myApp.use(Quasar, {
  plugins: { Notify },
})
myApp.use(router)

myApp.mount('#app')