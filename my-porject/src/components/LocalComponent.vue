<template>
  <div class="local">
    <div>data【msg:{{msg}},hyphen-props:{{$data['hyphen-props']}}】</div>
    <div>props【name:{{name}}】</div>
    <div>多个属性：{{text}},{{isComplete}}</div>
    <button @click="add">click{{counter}}</button>
  </div>
</template>

<script>
console.log('Local.....................') // 只有在import这个文件的时候执行，所以在父组件引用多个这个组件，只会执行一次
const data = { // 这样定义的话在HelloWorld中引用的<local-component></local-component>组件的$data属性，指向同一个引用data，修改数据会相互影响
  msg: 'customer local component! ',
  counter: 0,
  'hyphen-props': '----------'
}
export default {
  props: ['name', 'text', 'isComplete'], // 属性名称不能与data属性名称相同,不能用短横线连接命名，这样命名模板中无法输出
  data () {
    return data
  },
  methods: {
    add () {
      this.counter += 1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.local {
  color: red
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
