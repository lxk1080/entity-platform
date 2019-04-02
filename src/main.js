import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import fastclick from 'fastclick';
import 'common/js/iviewConfig';
import 'common/stylus/index.styl';
import 'common/js/axiosConfig';

Vue.config.productionTip = false;

fastclick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
