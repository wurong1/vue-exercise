<template>
  <div id="app">
    <img src="./assets/logo.png">
    <span>{{appProps}}</span>
    <div>{{rawHtml}}</div>
    <div v-html="rawHtml"></div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  props: ['appProps'],
  beforeUpdate: function () {
    console.log('App 组件跟新之前。。。。')  // 页面重新渲染之前，例如name属性跟新(响应式属性跟新但是没有映射到页面不会触发这个方法)
  },
  data: function () {
    return {
      rawHtml: '<span style="color:red">This should be red.</span>'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
