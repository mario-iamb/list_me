<template>
  <div>
    <h2>Hello from MongoDB</h2>
    
    <template v-if="loading">Loading</template>
    <template v-else>
      <ul>
        <li class="users__item" v-for="user in users" :key="user.id">
          {{ user.id }} , {{ user.name }} , {{ user.email  }} , {{ user.age }} - 
          <span><button @click="deleteUser()">Delete</button></span>
        </li>
      </ul>
    </template>

    <div class="add_new">
      <h2>Add new user here:</h2>
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
    deleteUser () {
      this.$apollo.mutate({
        mutation: DELETE_USER_QUERY,
        variables: {
          id: this.id,
          name: this.name,
          email: this.email,
          age: this.age,
        },
        // update: (store, {data: {deleteUser}}) => {
        //   const data = store.readQuery({query: ALL_USERS_QUERY})
        //   const index = data.users.findIndex(i => i.id === this.id)
        //   if (index !== -1) {
        //     data.users.splice(index, 1);
        //   }
        //   store.writeQuery({query: ALL_USERS_QUERY, data})
        // },

        update: store => {
          let data = store.readQuery({
            query: ALL_USERS_QUERY
          })
          const index = data.users.findIndex(i => i.id === this.id)

          if (index !== -1) {
            data.users.splice(index, 1);
          }
          store.writeQuery({query: ALL_USERS_QUERY, data})

        },
        
        // optimisticResponse: {
        //   __typename: 'Mutation',
        //   deleteUser: {
        //     __typename: 'Task',
        //     id:-1,
        //     name,
        //     email,
        //     age
        //   }
        // }
      }).then((data) => {
        // eslint-disable-next-line no-console
        console.log(data)
      })
    },
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
        update: (store, {data: {createUser}}) => {
          const data = store.readQuery({query: ALL_USERS_QUERY})
          data.users.push(createUser)
          store.writeQuery({query: ALL_USERS_QUERY, data})
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
    }
  }
}

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
