import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import { router } from './route.js'
import messages from './assets/locals/messages.js'

const app = createApp(App)
app.use(createI18n({
  local: 'en-US',
  fallbackLocal: 'en-US',
  messages: messages,
}))
app.use(router)
app.mount('#app')
