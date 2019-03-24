import Vue from 'vue';

import {
  Menu,
  Submenu,
  MenuGroup,
  MenuItem,
  Button,
  Icon,
  Select,
  Option,
  Input,
  Table,
  Page,
  Message,
  Avatar,
  Divider,
  Tag,
  DatePicker,
  Card,
  Row,
  Col,
  AutoComplete,
  RadioGroup,
  Radio,
  Cascader,
  Switch,
  Upload,
  Form,
  FormItem,
  Tree,
} from 'iview';

import 'iview/dist/styles/iview.css';

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
Vue.component('Avatar', Avatar);
Vue.component('Divider', Divider);
Vue.component('Tag', Tag);
Vue.component('DatePicker', DatePicker);
Vue.component('Card', Card);
Vue.component('Row', Row);
// 由于Col在原生html标签中是自闭合的，所以使用iview中的Col闭合标签会代码检查报错，这里改下名字
Vue.component('i-col', Col);
Vue.component('AutoComplete', AutoComplete);
Vue.component('RadioGroup', RadioGroup);
Vue.component('Radio', Radio);
Vue.component('Cascader', Cascader);
// 同样改名
Vue.component('Switchs', Switch);
Vue.component('Upload', Upload);
Vue.component('Form', Form);
Vue.component('FormItem', FormItem);
Vue.component('Tree', Tree);

// 由于使用的按需加载的方式，只能加载组件，导致很多初始化在iview入口中的操作并没有做，所以需要自己手动完成
Vue.prototype.$IVIEW = {
  transfer: false, // 所有带浮层的组件，是否将浮层放置在 body 内
};

Vue.prototype.$Message = Message;
