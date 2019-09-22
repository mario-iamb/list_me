<template>
  <div id="app">
    <!-- <HelloWorld></HelloWorld> -->
    <!-- <UsersWorld></UsersWorld> -->

    <ul class="nav">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/sandbox">Sandbox</router-link></li>
    </ul>

    <router-view></router-view>

  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import UsersWorld from './components/UsersWorld.vue'
import sandbox from './components/sandbox.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    UsersWorld,
    sandbox
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

ul.nav {
  width: 100%;
  list-style-type: none;
  padding: 10px 0;
  margin: 0;
}

ul.nav li {
  display: inline-block;
  margin: 0 10px;
}
</style>
