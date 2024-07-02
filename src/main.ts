import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import DialogService from 'primevue/dialogservice'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'

import { createPinia } from 'pinia'

import '@fontsource-variable/plus-jakarta-sans'
import 'remixicon/fonts/remixicon.css'
import './style.css'

const pinia = createPinia()

createApp(App)
    .use(pinia)
    .use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                cssLayer: {
                    name: 'primevue',
                    order: 'tailwind-base, primevue, tailwind-utilities',
                },
            },
        },
    })
    .use(DialogService)
    .use(ConfirmationService)
    .use(ToastService)
    .mount('#app')
