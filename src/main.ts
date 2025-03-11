import './assets/main.css'
import "@/assets/custom.scss"

// vuetify
import '@mdi/font/css/materialdesignicons.css'
import "vuetify/styles";
import { createVuetify } from 'vuetify';

const vuetify = createVuetify({
    icons: {
        defaultSet: "mdi",
    },
})

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(vuetify);
app.mount('#app')
