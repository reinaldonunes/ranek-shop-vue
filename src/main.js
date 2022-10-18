import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'

import PageLoad from '@/components/PageLoad.vue'
import ErrorNotification from '@/components/ErrorNotification.vue'

Vue.config.productionTip = false

Vue.component("PageLoad", PageLoad)
Vue.component("ErrorNotification", ErrorNotification)

Vue.filter("parseCurrency", valor =>{
  valor = Number(valor)
  if(!isNaN(valor)){
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })
  }else{
    return ""
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
