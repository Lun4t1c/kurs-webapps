import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ViewManager from './services/ViewManager';
import { createI18n } from 'vue-i18n';
import pl from "./locales/pl.json" 
import en from "./locales/en.json" 

const i18n = createI18n({ 
  locale: navigator.language, 
  fallbackLocale: "en", 
  messages: { pl, en }, 
  legacy: false 
})

ViewManager.checkStatus()

createApp(App)
    .use(router)
    .use(i18n)
    .mount('#app')
