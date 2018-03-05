import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layouts/Main'
import Learn from '@/pages/Learn.vue'
import Login from '@/pages/Login'
import Luyou from '@/pages/Luyou'

Vue.use(Router)

export default new Router({ // router-view在App中
  // mode: 'history', // localhost:8000/#/login => localhost:8000/login
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',  // 默认路由
          component: {
            template: '<div style="text-align: center">Home</div>'
          }
        },
        {
          path: 'learn/:type?', // ？表示type参数可有可无
          component: Learn
        },
        {
          path: 'luyou/:type?',
          component: Luyou
        }, {
          path: 'user/:userId/name/:name',
          component: Luyou,
          name: 'myuser'
        }
      ]
    }, {
      path: '/login', // 如果与根路径下的path名称重名的话这个的路由不会生效
      component: Login,
      alias: '/yyy'  // 给login取一个别名
    }, {
      path: '/xxx/:id?',
      redirect: to => {
        const { hash, params, query } = to // to包含了当前的路由信息
        console.log(hash, query, params)
        if (Number(params.id) === 1) {
          return '/login'
        }
      }
    }
  ]
})
