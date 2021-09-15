import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import FullCalendar from 'vue-fullcalendar'
Vue.use(FullCalendar)
Vue.config.productionTip = false
Vue.use(ElementUI)
var _hmt = _hmt || [];
window._hmt = _hmt; // 修改为window 全局变量
(function () {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?b34ef66dc01339cd22da7ce520ae2179";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

