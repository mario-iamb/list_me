<template>
  <div>
    <h2>Hello from MongoDB</h2>
    
    <template v-if="loading">Loading</template>
    <template v-else>
      <ul>
        <li class="users__item" v-for="user in users" :key="user.name">
          {{ user.name }} , {{ user.email  }} , {{ user.age }}
        </li>
      </ul>
    </template>
  </div>

</template>

<script>
import { ALL_USERS_QUERY } from '../graphql/allUsers'

export default {
  name: 'HelloWorld',
  data () {
    return {
      users: [],
      loading: 0,
    }
  },
  apollo: {
    users: {
      query: ALL_USERS_QUERY
    },
  },
}

</script>

<style scoped>
h3 {
  margin: 40px 0 0;
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

.users__item {
  display: block;
}

</style>
