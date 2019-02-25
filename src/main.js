import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import fastclick from 'fastclick';
import { Menu, Submenu, MenuGroup, MenuItem, Button, Icon } from 'iview';
import 'iview/dist/styles/iview.css';
import 'common/stylus/index.styl';

Vue.config.productionTip = false;

fastclick.attach(document.body);

Vue.component('Menu', Menu);
Vue.component('Submenu', Submenu);
Vue.component('MenuGroup', MenuGroup);
Vue.component('MenuItem', MenuItem);
Vue.component('Button', Button);
Vue.component('Icon', Icon);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
