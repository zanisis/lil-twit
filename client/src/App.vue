<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <header-bar></header-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderBar from './components/Header.vue'
export default {
  name: 'app',
  components:{
    HeaderBar
  },
  created(){
    this.$store.dispatch('getTwitt')
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
  margin-top: 10px;
}
</style>
