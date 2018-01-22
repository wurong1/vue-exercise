<template>
  <div id="app">
    <img src="./assets/logo.png">
    <p>1.数据绑定，使用双括号语法{{`\{\{appProps\}\}`}}</p>
    <div>组件的自定义属性appProps:{{appProps}}</div>
    姓名(双向数据绑定)：<input v-model="name"/><span>{{name}}</span>
    
    <p>2.使用v-html指令将字符串转化为html</p>
    <div>{{rawHtml}}</div>
    <div v-html="rawHtml"></div>

    <p>3.双括号语法不能用在dom属性上面,需要使用'v-bind:atrr'或者':attr'代替如':class="show"'</p>
    <div :class="show">{{show}}</div>
    <p>3.1 当布尔属性值为undefined，null,或者false的时候，btn的disabeld属性不会被渲染的,而原始的bool属性值只要存在即为true(与等号后的赋值没有关系)始终会被渲染的</p>
    <button :disabled="btnDisabled">click(:disabled='btnDisabled')</button>
    <button disabled="false">click(disabled='false')</button>

    <p>4.支持js表达式(不能使用语句)</p>
    <div :class="`app-${show}`">翻转变量{{show}}: {{ show.split('').reverse().join('') }}<br/>{{`app-${show}`}}</div>
    
    <p>5.指令(属性值是单个js表达式，v-for除外)</p>
    <div v-if="seen">不能看见我</div>
    <div v-if="!seen">能看见我(v-if为false不会渲染dom,v-show为false会渲染dom只是隐藏)</div>
    <div v-show="seen">能看见我</div>
    <div>指令缩写</div>
    <button v-on:click="() => { dosomething(1231) }">click me(v-on:click)</button>
    <button @click="dosomething">click me(@click)</button>

    <p>6.计算属性(一些复杂的表达式请使用计算属性)</p>
    <div>message: {{message}}, reverseMessage: {{reverseMessage}}</div>
    <div>计算属性 vs 方法 vs 监听属性watch</div>
    <div>计算属性 newName: {{newName}} <button @click="setNewName">设置属性</button></div>
    <div>方法 newName1(): {{newName1()}}</div>
    <div>(1)计算属性基于他们的依赖进行了缓存(缓存的是自身属性值)，只有依赖发生改变的时候才会重新计算</div>
    <div>(2)通过方法返回的值只有re-render的时候方法才会重新执行</div>
    <div>(3)当一些数据需要随着其他数据变动时应合理使用计算属性而不是watch</div>
    <div>当计算开销比较大的时候选择第一种方式</div>
    <p>7.watch监听器</p>
    <div>Ask a yes/no question<input v-model="question" /></div>
    <div>{{answer}}</div>
    <router-view/>
  </div>
</template>

<script>
var _ = require('lodash')
var axios = require('axios')  // 用于发请求
export default {
  name: 'app',  // 与模板中的id为app的div没有对应关系
  props: ['appProps'],
  beforeUpdate: function () {
    console.log('App 组件跟新之前。。。。')  // 页面重新渲染之前，例如name属性跟新(响应式属性跟新但是没有映射到页面不会触发这个方法)
  },
  data: function () {
    return {
      rawHtml: '<span style="color:red">This should be red.</span>',
      show: 'show',
      btnDisabled: false,  // 当布尔属性值为undefined，null,或者false的时候，btn的disabeld属性不会被渲染的
      seen: false,
      name: '',
      message: 'Message',
      question: '',
      answer: 'I cannot give you an answer until you ask a question!'
    }
  },
  computed: {
    reverseMessage: function () { // computed中的属性是定义在vm上的，所以不能与data和method的属性重名
      return this.message.split('').reverse().join('')
    },
    newName: {
      get: function () {
        return `{{${this.name}}}`
      },
      set: function (val) {
        this.name = val
      }
    }
  },
  watch: {
    name: function (newVal, preVal) {
      this.seen = !this.seen
    },
    question: function (newQuestion, oldQuestion) { // watch中可以用一些异步操作，设置一些中间状态，这些是计算属性无法做到的
      this.answer = 'waiting for you to stop typing'
      this.getAnswer()
    }
  },
  methods: {
    dosomething: function (parms) {
      console.log('app组件的props:', this.$props)
      console.log('................', parms)
      console.log('app组件 message:', this.message)
      setTimeout(() => {
        this.message = 'GoodBye'
        console.log('app组件 reverseMessage:', this.reverseMessage)
      }, 5000)
    },
    newName1: function () {
      return `{{${this.name}}}`
    },
    getAnswer: _.debounce( // 限制操作频率的函数，当前后两次访问函数的间隔大于500ms的时候函数才执行
      function () {
        if (this.question.indexOf('?') === -1) {
          this.answer = 'Questions usually contain a question mark. ;-)'
          return
        }
        this.answer = 'Thinking...'
        var vm = this
        axios.get('https://yesno.wtf/api')
          .then(function (response) {
            vm.answer = _.capitalize(response.data.answer) // 将字符串的首字母大写余下的保持不变
          })
          .catch(function (error) {
            vm.answer = 'Error! Could not reach the API. ' + error
          })
      },
      // This is the number of milliseconds we wait for the
      // user to stop typing.
      500
    ),
    setNewName: _.debounce(
      function () {
        console.log('click.............')
        this.newName = 'wurong'
      }, 500
    )
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
