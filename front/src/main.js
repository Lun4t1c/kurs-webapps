import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ViewManager from './services/ViewManager';
import { createI18n } from 'vue-i18n';
import pl from "./locales/pl.json"
import en from "./locales/en.json"
import 'vue3-toastify/dist/index.css';
import './tailwind.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);

const i18n = createI18n({
  locale: navigator.language.split('-')[0],
  fallbackLocale: "en",
  messages: { pl, en },
  legacy: false
})

ViewManager.checkStatus()

const app = createApp(App)
  .use(router)
  .use(i18n);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');