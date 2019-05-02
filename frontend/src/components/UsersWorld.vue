<template>
  <div>
    <p>UsersWorld component</p>
    <template>
      <ul>
        <li class="users__item" v-for="user in users" :key="user._id">
          {{ user.id }} , {{ user.name }} , {{ user.email }} , {{ user.age }}
          <span><button @click="editUser(user)">Edit</button></span> 
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
          <button @click="updateUser()">Update</button>
      </div>
    </div>

  </div>
</template>

<script>
  import { MY_USERS } from '../graphql/myUsers'
  import { MY_USER_ADD } from '../graphql/myUserAdd'
  import { MY_USER_UPDATE } from '../graphql/myUserUpdate'
  import { MY_USER_DELETE } from '../graphql/myUserDelete'

  export default {
    name: 'UsersWorld',
    data() {
      return {
        users:[],
        id:'',
        name:'',
        email:'',
        age:'',
        globalVar:'',
        // user: {
        //   id:'',
        //   name:'',
        //   email:'',
        //   age:''
        // },
      }
    },
    apollo: {
      users: {
        query: MY_USERS,
        // result ({ data }) {
        //   this.users = Object.assign({}, data.users)
        // }
        // update: data => {
        //   return data.users
        // }
      }
    },
    methods: {
      createUser() {
        const id = this.id
        const name = this.name
        const email = this.email
        const age = this.age

        this.$apollo.mutate({
          mutation: MY_USER_ADD,
          variables: {
            id,
            name,
            email,
            age
          },
          update: (cache, {data: {createUser}}) => {
            const data = cache.readQuery({query: MY_USERS})
            data.users.push(createUser)
            cache.writeQuery({ query: MY_USERS, data })
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createUser: {
              __typename: 'Task',
              id:-1,
              _id:-1,
              name,
              email,
              age,
            }
          },
        })
      },
      editUser (user) {
        this.globalVar = user._id
        this.id = user.id
        this.name = user.name
        this.email = user.email
        this.age = user.age
      },
      updateUser() {
        const _id = this.globalVar
        const id = this.id
        const name = this.name
        const email = this.email
        const age = this.age

        this.$apollo.mutate({
          mutation: MY_USER_UPDATE,
          variables: {
            _id,
            id,
            name,
            email,
            age
          },
          update: (cache, {data: {updateUser}}) => {
            const data = cache.readQuery({query: MY_USERS})
            const userToUpdate = data.users.find(i => i._id === _id);
            data.users.splice(data.users.indexOf(userToUpdate), 1, updateUser);
            cache.writeQuery({ query: MY_USERS, data })
          },
          optimisticResponse: {
            __typename: 'Mutation',
            updateUser: {
              __typename: 'Task',
              _id:-1,
              id,
              name,
              email,
              age
            }
          },
        })
      },
      deleteUser (user) {
        this.$apollo.mutate({
          mutation: MY_USER_DELETE,
          variables: {
            _id: user._id
          },
          update: store => {
            const data = store.readQuery({query: MY_USERS})
            const userToDelete = data.users.find(i => i._id === user._id);
            data.users.splice(data.users.indexOf(userToDelete), 1);
            store.writeQuery({query: MY_USERS, data});
          },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteUser: {
              __typename: 'Task',
              _id:-1
            }
          },
        })
      },
    },
    // computed: {
    //   isDisabled: function(){
    //     return !this.id;
    //   }
    // }

    // https://vuejs.org/v2/guide/list.html#Caveats

    // https://hackernoon.com/full-stack-vue-with-graphql-aws-appsync-adc5af474dc9
    // https://css-tricks.com/methods-computed-and-watchers-in-vue-js/
    // https://medium.com/js-dojo/reactivity-in-vue-js-and-its-pitfalls-de07a29c9407
    // https://ionicacademy.com/ionic-storage-crud-operations/
    // https://vuejs.org/v2/guide/reactivity.html
  }
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

.users__item {
  display: block;
}
</style>