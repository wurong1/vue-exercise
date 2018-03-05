<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>这是一个全局组件</p>
    <my-component ></my-component>
    <local-component name="wwww" v-bind="todo"></local-component>
    <local-component name="rrrr" v-bind="todo"></local-component>
  </div>
</template>

<script>
import MyComponent from '@/components/LocalComponent' // 或者'./LocalComponent'
export default {
  name: 'HelloWorld',
  data () {  // 定义组件的时候，data必须声明为返回一个初始数据对象的函数
    return {
      msg: 'Welcome to Your Vue.js App this HelloWorld Component',
      todo: {
        text: 'Learn Vue',
        isComplete: false
      }
    }
  },
  components: {
    'local-component': MyComponent // 局部注册之后才能在模板中使用
  },
  created: function () {
    console.log(this.$route)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  border: 1px solid black;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
