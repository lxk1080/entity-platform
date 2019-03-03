import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import fastclick from 'fastclick';
import { Menu, Submenu, MenuGroup, MenuItem, Button, Icon, Select, Option, Input, Table, Page, Message, Avatar, Divider, Tag } from 'iview';
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
Vue.component('Select', Select);
Vue.component('Option', Option);
Vue.component('Input', Input);
Vue.component('Table', Table);
Vue.component('Page', Page);
Vue.prototype.$Message = Message;
Vue.component('Avatar', Avatar);
Vue.component('Divider', Divider);
Vue.component('Tag', Tag);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
