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

    <div class="add_new">
      <h2>Add new user here:</h2>
      
      <!-- <form class="add_new_form" v-on:submit="addAction"> -->
        <div class="field">
            <input type="text" v-model="id" placeholder="ID">
        </div>

        <div class="field">
            <input type="text" v-model="name" placeholder="Name">
        </div>

        <div class="field">
            <input type="text" v-model="email" placeholder="Email">
        </div>

        <div class="field">
            <input type="number" v-model.number="age" placeholder="Age">
        </div>

        <div class="field">
            <!-- <input type="submit" value="ADD"> -->
            <button @click="addAction()">Add</button>
        </div>
      <!-- </form> -->
    </div>

  </div>

</template>

<script>
import { ALL_USERS_QUERY } from '../graphql/allUsers'
import { CREATE_USER_QUERY } from '../graphql/addUser'

export default {
  name: 'HelloWorld',
  data () {
    return {
      users: [],
      loading: 0,
      id:'',
      name:'',
      email:'',
      age:'',
    }
  },
  apollo: {
    users: {
      query: ALL_USERS_QUERY
    },
  },
  methods: {
    addAction() {
      const id = this.id
      const name = this.name
      const email = this.email
      const age = this.age

      this.$apollo.mutate({
        mutation: CREATE_USER_QUERY,
        variables: {
          id,
          name,
          email,
          age,
        },
        // update: (store, { data: {createUser}}) => {
        //   this.updateListAfterChange(store, createUser)
        // }
        // update: (store, {data: {createUser}}) => {
        //   const data = store.readQuery({query: ALL_USERS_QUERY})
        //   data.users.push(addAction)
        //   store.writeQuery({query: ALL_USERS_QUERY, data})
        // }
      })
    },
    // updateListAfterChange (store, createUser ) {
    //   const data = store.readQuery({ query: ALL_USERS_QUERY })
    //   // const myUserList = data.users
    //   // myUserList = createUser
    //   // data.users = createUser
    //   store.writeQuery({ query: ALL_USERS_QUERY, data })
    // }
  }
}

// https://www.howtographql.com/vue-apollo/6-more-mutations-and-updating-the-store/
// https://github.com/howtographql/vue-apollo/blob/master/src/components/LinkItem.vue

</script>

<style scoped>
.add_new {
  width: 300px;
  margin: 50px auto;
}

.add_new_form {
  width: 200px;
  margin: 0 auto;
}

.field {
  width: 100%;
  margin-bottom: 10px;
}

input {
  width: 100%;
}

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
