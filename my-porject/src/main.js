// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
// vue 根实例
const data = {name: 'wurong'}
const vm = new Vue({
  el: '#app', // 替换index.html中id为app的节点
  router,
  template: '<App/>',
  components: { App },
  data
})

// 实例属性都可以通过vm.$attrname的方式获取
console.log('vm.$data:', vm.$data)

// data对象的所有属性都加入到了vue的响应式系统，属性值变化的时候，视图产生响应，可以直接通过vm.attrname的方式访问data属性
console.log('vm.$data:', vm.name)

setTimeout(() => {
  data.name = 'wurong++'
  console.log('after 1 second', vm.name)
}, 2000)
