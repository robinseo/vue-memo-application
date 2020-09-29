import Vue from 'vue'
import App from './App.vue'
import store from './store' //이렇게 쓰면 해당 디렉토리의 index.js 파일을 찾아서 불러오는 룰이 있다 칸다..

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
