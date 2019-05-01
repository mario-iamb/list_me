<template>
  <div>
    <!-- <h2>Hello from MongoDB</h2> -->
    
    <template v-if="loading">Loading</template>
    <template v-else>
      <ul>
        <li class="users__item" v-for="user in users" :key="user.id">
          <!--{{ user._id }} ,-->  {{ user.id }} , {{ user.name }} , {{ user.email  }} , {{ user.age }} 
          <span><button @click="updateUser(user)">Edit</button></span> 
          <span><button @click="deleteUser(user)">Delete</button></span>
        </li>
      </ul>
    </template>

    <div class="add_new">
      <h2>Add/Update user here:</h2>
      <div class="field">
          <input type="text" v-model="id" placeholder="ID">
      </div>

      <div class="field">
          <input type="text" v-model="name" placeholder="Name">
      </div>

      <div class="field">
          <input type="email" v-model="email" placeholder="Email">
      </div>

      <div class="field">
          <input type="number" v-model.number="age" placeholder="Age">
      </div>

      <div class="field">
          <button @click="createUser()">Add</button>
      </div>
    </div>

  </div>

</template>

<script>
import { ALL_USERS_QUERY } from '../graphql/allUsers'
import { CREATE_USER_QUERY } from '../graphql/addUser'
// import { UPDATE_USER_QUERY } from '../graphql/updateUser'
import { DELETE_USER_QUERY } from '../graphql/deleteUser'

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
    createUser() {
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
        update: (cache, {data: {createUser}}) => {
          const data = cache.readQuery({query: ALL_USERS_QUERY})
          data.users.push(createUser)
          cache.writeQuery({ query: ALL_USERS_QUERY, data })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createUser: {
            __typename: 'Task',
            id:-1,
            name,
            email,
            age,
          }
        }
      }).then((data) => {
        // eslint-disable-next-line no-console
        console.log(data)
      })
    },

    updateUser (user) {
      // eslint-disable-next-line no-console
      console.log(user._id);
    },
    
    deleteUser (user) {
      const id = user.id
      const name = user.name
      const email = user.email
      const age = user.age

      this.$apollo.mutate({
        mutation: DELETE_USER_QUERY,
        variables: {
          id,
          name,
          email,
          age,
        },
        update: (store, {data: {deleteUser}}) => {
          const data = store.readQuery({query: ALL_USERS_QUERY})
          data.users = data.users.filter(i => i.id !== deleteUser.id)
          store.writeQuery({query: ALL_USERS_QUERY, data})
        },
        optimisticResponse: {
          __typename: 'Mutation',
          deleteUser: {
            __typename: 'Task',
            ...user
          }
        }
      }).then((data) => {
        // eslint-disable-next-line no-console
        console.log(data)
      })
    },
  }
}


// https://www.youtube.com/watch?v=iJULWNCaLrY
// https://github.com/leonardomso/graphql-mongodb-server/blob/master/graphql/types/User/index.js

// https://blog.pusher.com/fullstack-graphql-app-prisma-apollo-vue/
// https://www.graph.cool/
// https://medium.com/yld-engineering-blog/using-vue-with-apollo-65e2b1297592
// https://hackernoon.com/full-stack-vue-with-graphql-aws-appsync-adc5af474dc9

// https://github.com/Akryum/vue-apollo-todos/blob/master/src/components/TodoListItem.vue
// https://gist.github.com/dabit3/4cf155b5b55e933f7e1db81fc41ac4a1

// https://codesandbox.io/s/42lqq8m9q9
// https://www.codementor.io/lautiamkok/javascript-tips-searching-the-index-of-an-element-and-delete-or-replace-it-cfpy6uasy

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
