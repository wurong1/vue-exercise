<template>
  <div id="app">
    <img src="./assets/logo.png">
    <p>1.数据绑定，使用双括号语法{{`\{\{appProps\}\}`}}</p>
    <span>{{appProps}}</span>
    <p>2.使用v-html指令将字符串转化为html</p>
    <div>{{rawHtml}}</div>
    <div v-html="rawHtml"></div>
    <p>3.双括号语法不能用在dom属性上面,需要使用'v-bind:atrr'或者':attr'代替如':class="show"'</p>
    <div :class="show">{{show}}</div>
    <p>3.1 当布尔属性值为undefined，null,或者false的时候，btn的disabeld属性不会被渲染的,而原始的bool属性值只要存在即为true(与等号后的赋值没有关系)始终会被渲染的</p>
    <button :disabled="btnDisabled">click(:disabled='btnDisabled')</button>
    <button disabled="false">click(disabled='false')</button>
    <p>4.支持js表达式(不能使用语句)</p>
    <div :class="`app-${show}`">翻转变量show: {{ show.split('').reverse().join('') }}<br/>{{`app-${show}`}}</div>
    <p>5.指令(属性值是单个js表达式，v-for除外)</p>
    <div v-if="seen">不能看见我</div>
    <div v-if="!seen">能看见我</div>
    <button v-on:click="dosomething">click me</button>
    <button @click="dosomething">click me@</button>
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
      rawHtml: '<span style="color:red">This should be red.</span>',
      show: 'show',
      btnDisabled: false,  // 当布尔属性值为undefined，null,或者false的时候，btn的disabeld属性不会被渲染的
      seen: false
    }
  },
  methods: {
    dosomething: function () {
      console.log('app组件的props:', this.$props)
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
p {
  color: green;
}
</style>
