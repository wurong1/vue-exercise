// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
// vue 根实例
// data是一个存粹的对象，浏览器 API 创建的原生对象，原型上的属性会被忽略
const data = {name: 'wurong', jiguan: 'sichuan', $test: 'hehe'}
const vm = new Vue({
  el: '#app', // 替换index.html中id为app的节点
  router,
  template: '<App :app-props="name" />',
  components: { App },
  data: function () { // 使用data: data也可以，但是在component内声明data必须使用函数的形式
    return data
  },
  beforeCreate: function () {
    // 可以在这里加一个Loading事件
  },
  created: function () {
    // 'this'指向vue实例,不能使用箭头函数，箭头函数是和父级的上下文绑定的
    console.log('创建实例vm.name:', this.name)
  },
  beforeMount: function () {
    console.log('实例挂载之前vm.$el', this.$el) // 编译模板,app节点还没有被替换
  },
  mounted: function () {
    this.$nextTick(function () { // 所有子组件也挂载完成会触发这个函数
      console.log('所有组件挂载完毕。。。。。')
    })
    console.log('实例挂载之后vm.$el', this.$el) // 实例已经挂载到app节点
  },
  beforeUpdate: function () {
    console.log('根组件跟新之前。。。。')  // 页面重新渲染之前，例如name属性跟新(响应式属性跟新但是没有映射到页面不会触发这个方法)
  },
  updated: function () {
    console.log('根组件跟新后.....')
    this.name = 'hehe'
  },
  methods: {
    plus: function () { // 内部使用this.plus()调用，外部使用vm.plus()调用
      this.name = 'wr'
    }
  }
})

// 实例属性都可以通过vm.$attrname的方式获取
console.log('vm.$data:', vm.$data)

// data对象的所有属性都加入到了vue的响应式系统，属性值变化的时候，视图产生响应，可以直接通过vm.attrname的方式访问data属性
console.log('vm.name:', vm.name)

// vue实例不会代理以_或者$开头的属性,因为这些属性可能与Vue内置属性或api方法冲突了
console.log('vm.$test:', vm.$test, 'vm.$data.$test:', vm.$data.$test)

// 获取dom节点
console.log('vm.$el:', vm.$el) // 实例挂载到dom之后才可以访问

setTimeout(() => {
  data.name = 'wurong++'
  console.log('after 1 second name is:', vm.name)
}, 2000)

vm.$watch('name', function (newValue, preValue) {
  console.log(`name is change from ${preValue} to ${newValue}`)
})
