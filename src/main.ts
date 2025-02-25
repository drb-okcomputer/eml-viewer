import './assets/main.css'
import "@/assets/custom.scss"

// vuetify
import '@mdi/font/css/materialdesignicons.css'
import "vuetify/styles";
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: "mdi",
    },
})

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(vuetify);
app.mount('#app')
