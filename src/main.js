import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueMeta from 'vue-meta'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from "./filter/date.filter"
import currencyFilter from  "./filter/currencyFilter"
import localaizeFillter from  "./filter/localize.fillter"
import tooltipDirective from './directives/tooltip.derective'
import msgPlagin from "./utils/msg.plagin"
import loader from './components/app/v-loader'
import 'materialize-css/dist/js/materialize.min.js'


import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import vuetify from './plugins/vuetify';


Vue.config.productionTip = false;
Vue.use(msgPlagin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter )
Vue.filter('localaize', localaizeFillter )
Vue.directive('tooltip', tooltipDirective)
Vue.component('loader', loader)
Vue.component('Paginate', Paginate)


firebase.initializeApp({
  apiKey: "AIzaSyDy8bWPhe5HdcaSo8MGRDHQeQbU_8boS2w",
  authDomain: "sonin-app.firebaseapp.com",
  databaseURL: "https://sonin-app.firebaseio.com",
  projectId: "sonin-app",
  storageBucket: "sonin-app.appspot.com",
  messagingSenderId: "27663267228",
  appId: "1:27663267228:web:d37f8782d6ebef579f0459"
})

let app
firebase.auth().onAuthStateChanged(() => {
  if (!app){
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})


