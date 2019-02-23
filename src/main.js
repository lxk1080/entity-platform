import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import fastclick from 'fastclick';
import { Button } from 'iview';
import 'iview/dist/styles/iview.css';
import 'common/stylus/index.styl';

Vue.config.productionTip = false;

fastclick.attach(document.body);

Vue.component('Button', Button);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
