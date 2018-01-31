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
    <img :src="imgSrc" />
    <p>8.Class绑定</p>
    <div>v-bind用于class和style的时候，vue做了增强的，表达式的类型除了字符串之外还可以是对象</div>
    <div class="static" :class="{'red-color': isActive, 'green-color': !isActive}">对象语法<button v-on:click="isActive=!isActive">change color</button></div>
    <div class="static" :class="[{'red-color': isActive1}, {'green-color': !isActive1}, 'font-class', font_style]">数组语法<button v-on:click="isActive1=!isActive1">change color</button></div>
    <p>9.Style绑定</p>
    <div class="static" :style="{color: '#e8d435', fontSize: '20px', 'font-weight': 'bold'}">style对象语法</div>
    <div class="static" :style="[{color: 'rgb(177, 37, 246)', fontSize: '20px'}, styleObj ]">style数组语法</div>
    <p>9.条件渲染v-if v-show</p>
    <div v-if="renderFlag">v-if(为false的时候dom不会渲染)</div>
    <div v-else>v-else</div>
    <div v-show="!renderFlag">v-show(dom会渲染通过css属性控制展示)</div>
    <template  v-if="!renderFlag">
      <div>I am in the templage tag...</div>
      <div>I am in the templage tag too...</div>
    </template>
    <button @click="renderFlag=!renderFlag">click</button>
    <p>10.用key管理复用的元素</p>
    <div>vue为了能够高效的渲染，通常会复用已有的元素而不是从头渲染，</div>
    <template v-if="loginType === 'username'">
       <label>UserName</label>
       <input placeholder="Enter username"/>
    </template>
     <template v-else>
       <label>Email</label>
       <input placeholder="Enter email"/>
    </template>
    <button @click="toogle">Toogle login type</button>
    <input v-if="loginType === 'username'" placeholder="Enter username" key="username-input"/>
    <input v-if="loginType === 'email'"  placeholder="Enter email" key="email-input"/>
    <p>11. 列表渲染v-for</p>
    <div>1）数组：将数组对应为一组元素，每一个元素需要唯一的key，key变量来自v-for指令</div>
    <ul>
      <li v-for="(item, index) in items" :key="index">(使用in分隔符){{index}}-{{item.message}}</li>
    </ul>
     <ul>
      <li v-for="(item, index) of items" :key="index">
        <span :class="{'red-color': index % 2 === 0, 'green-color':index % 2 !== 0}">
          (使用of分隔符){{item.message}}
        </span>
      </li>
    </ul>
    <div>1.1)显示数组过滤排序结果(可用计算属性也可用method)</div>
    <ul>
      <li v-for="(item, index) in evenItems" :key="index">【计算属性】 {{item.message}}</li>
    </ul>
    <ul>
      <li v-for="(item, index) in even(items)" :key="index">【method】 {{item.message}}</li>
    </ul>
    <div>1.2)v-for with v-if其中v-for的优先级别高于v-if</div>
    <ul>
      <li v-for="(item, index) in items" :key="index" v-if="index % 2 === 0">【v-for whith v-if】 {{item.message}}</li>
    </ul>
    <div>2）对象：遍历对象属性值</div>
    <ul>
      <li v-for="(value, key, index) in obj" :key="key">(使用of分隔符){{index}}-{{`${key}:${value}`}}</li>
    </ul>
    <p>12.数组更新检测</p>
    <ul>
      <li v-for="(item, index) in arry" :key="index">{{index}}{{item.message}}</li>
    </ul>
    <button @click="arry.push({message: 'qian'})">push</button>
    <button @click="arry = arry.concat({message: 'sun'})">concat</button>
    <p>13.对象更新检测</p>
    <div>Vue检测不到属性添加/删除(不会重新渲染页面)，不能在根级别添加/删除响应式属性，但是可以通过Vue.set(vm.$set)或者通过Object.assign返回一个新对象添加响应式属性,Vue.delete(vm.$delete)删除一个响应属性</div>
    <ul>
      <li v-for="(val, key, index) in obj0" :key="index">{{key}}:{{val}}</li>
    </ul>
    <button @click="obj0.name = 'xiaowu'">修改属性【obj0.name='xiaowu'】</button>
    <button @click="setPro">新增属性【Vue.set(obj0, 'height', 163)"】</button>
    <button @click="addPro">新增多个属性</button>
    <button @click="$delete(obj0, 'name')">删除属性name</button>
    <P>14.事件处理</P>
    <button v-on:click="add1">Add1</button>
    <div>the button above has been clicked {{count}} times</div>
    <div @click="outer">
      <div>外层</div>
      <div @click.capture="middle">
        中间
        <div @click="inner">
          内部
        </div>
      </div>
    </div>
    <p>15.按键修饰符(enter)</p>
    <input @keyup.enter="hadleKeyup"/>
    <p>16.表单输入绑定</p>
    <div>使用v-model指令在input、textarea、checkbox等表单元素上创建双向数据绑定</div>
    <div>
      <div>1.输入框</div>
      <span>{{message0}}</span>
      <input v-model="message0"/>
    </div>
    <div>
      <div>2.单个checkbox</div>
      <span>{{checked}}</span>
      <input type="checkbox" v-model="checked">
    </div>
    <div>
      <div>3.多个 checkbox</div>
      <span>{{checkedNames}}</span>
      <input type="checkbox" value="Jack" v-model="checkedNames">
      <label for="jack">Jack</label>
      <input type="checkbox" value="John" v-model="checkedNames">
      <label for="john">John</label>
    </div>
    <div>
      <div>4.radio</div>
      <span>{{picked}}</span>
      <input type="radio" value="One" v-model="picked">
      <label for="one">One</label>
      <br>
      <input type="radio" value="Two" v-model="picked">
      <label for="two">Two</label>
    </div>
    <div>
      <div>4.select(如果option没有设置value选择的结果是文本值)</div>
      <span>{{selected}}</span>
      <select v-model="selected">
        <option value="" disabled>请选择</option>
        <option value="valueA">A</option>
        <option>B</option>
      </select>
    </div>
    <p>17.v-model修饰符，.lazy .number .trim</p>
    <div>
      数值类型(将用户的输入值转化为数值类型)：<input v-model.number="age" />
      <button @click="printAge">click</button>
    </div>
    <div>
      去空格(自动过滤用户输入的首尾空格)：<input v-model.trim="trimAge" />
      <button @click="printTrimAge">click</button>
    </div>
    <p>18.自定义组件</p>
    <div>全局注册组件可以在任意模板中使用，局部注册组件只能在当前组件的模板中使用(例如在HelloWorld组件中局部注册的组件)</div>
    <div><my-component></my-component></div>
    <p>19.单向数据流</p>
    <div>1.使用props初始化data属性</div>
    <div>{{initProps}}</div>
    <div>2.使用props初始化计算属性</div>
    <div>{{appCompute}}</div>
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue' // 使用require的方式Vue.set会报错
import _ from 'lodash'
var axios = require('axios')  // 用于发请求

export default {
  name: 'app',  // 与模板中的id为app的div没有对应关系
  props: {
    'appProps': {
      type: String
    }
  },
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
      answer: 'I cannot give you an answer until you ask a question!',
      imgSrc: null,
      isActive: false,
      isActive1: true,
      styleObj: {
        'font-style': 'italic',
        transform: 'rotate(9deg)'
      },
      renderFlag: false,
      loginType: 'username',
      items: [{message: 'zhang'}, {message: 'wang'}, {message: 'li'}],
      obj: {age: 27, name: 'wurong', city: 'ChengDu'},
      arry: [{message: 'zhang'}, {message: 'wang'}, {message: 'li'}],
      obj0: {age: 27, name: 'wurong', city: 'ChengDu'},
      count: 0,
      message0: '',
      checked: false,
      checkedNames: [],
      picked: null,
      selected: '',
      testArray: { a: [2, 4, 9] },
      age: null,
      trimAge: '',
      initProps: this.appProps // 这里只是初始化initProps，当appProps改变的时候不受影响
    }
  },
  computed: {
    reverseMessage: function () { // computed中的属性是定义在vm上的，所以不能与data和method的属性重名
      return this.message.split('').reverse().join('')
    },
    evenItems: function () {
      return this.items.filter((item, index) => index % 2 === 0)
    },
    newName: {
      get: function () {
        return `{{${this.name}}}`
      },
      set: function (val) {
        this.name = val
      }
    },
    font_style: function () {
      return this.isActive1 ? 'style-i' : 'style-b'
    },
    appCompute: function () {
      return `${this.appProps}!!!!!!!!!!` // 属性更新appCompute也会跟新
    }
  },
  watch: {
    name: function (newVal, preVal) {
      this.seen = !this.seen
    },
    question: function (newQuestion, oldQuestion) { // watch中可以用一些异步操作，设置一些中间状态，这些是计算属性无法做到的
      this.answer = 'waiting for you to stop typing'
      this.getAnswer()
    },
    age: function (newVal, preVal) {
      console.log('typeof age:', typeof this.age, this.age)
    }
  },
  updated: function () {
    console.log('update App ................')
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
            vm.answer = _.capitalize(response.data.answer) // _.capitalize将字符串的首字母大写余下的保持不变
            vm.imgSrc = response.data.image  // 图片请求返回很慢，在network中可以查看请求有咩有返回
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
        this.newName = 'wurong'  // 'wurong'会传到newName的set方法中，set方法用这个值改变name从而改变newName的值
      }, 500
    ),
    toogle: function () {
      if (this.loginType === 'username') {
        this.loginType = 'email'
      } else {
        this.loginType = 'username'
      }
    },
    setPro: function () {
      Vue.set(this.obj0, 'height', 163) // 或者this.$set(this.obj0, 'height', 163)
    },
    addPro: function () {
      this.obj0 = Object.assign({}, this.obj0, { // _.assign相当于Object.assign
        xxx: 123,
        yyy: 456
      })
    },
    even: function (data) {
      return data.filter((item, index) => index % 2 === 0)
    },
    add1: function (event) {
      this.count += 1
      if (event) console.log(event.target)
    },
    outer: function (event) {
      console.log('outer', event.target)
    },
    middle: function (event) {
      console.log('middle', event.target)
    },
    inner: function (event) {
      console.log('inner', event.target)
    },
    hadleKeyup: function (event) {
      // 加了enter修饰符只会处理enter按键
      console.log(event)
    },
    printAge: function () {
      console.log('this.age:', this.age)
    },
    printTrimAge: function () {
      console.log('this.trimAge:', this.trimAge)
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
.red-color {
  color: red
}
.green-color {
  color: #41b883
}
.font-class {
  font-size: 22px;
}
.style-i {
  font-style: italic
}
.style-b {
  font-weight: bold
}
</style>
