<template>
  <div id="app">
    <!-- <HelloWorld></HelloWorld> -->
    <!-- <UsersWorld></UsersWorld> -->

    <ul class="nav">
      <li><router-link to="/">Users</router-link></li>
      <li><router-link to="/tasks">tasks</router-link></li>
      <li><router-link to="/sandbox">Sandbox</router-link></li>
    </ul>

    <router-view></router-view>

  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import tasks from './components/tasks.vue'
import UsersWorld from './components/UsersWorld.vue'
import sandbox from './components/sandbox.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    UsersWorld,
    sandbox,
    tasks
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
  display: flex;
  justify-content: center;
  list-style-type: none;
  margin: 0 auto;
  padding: 10px 0;
  width: 100%;
}

ul.nav li {
  font-family: 'Brown', sans-serif;
  font-size: 12px;
  text-transform: uppercase;
  display: inline-block;
  margin: 0 10px;
}
</style>
