<template>
  <div>
    <p>UsersWorld component</p>
    <template>
      <div class="container">
        <div class="row">
          <div class="col-sm-3 users__item" v-for="user in users" :key="user._id">
            <div class="users__item-content">
              <div class="users__item-id">ID: {{ user.id }}</div>
              <div class="users__item-name">Name: {{ user.name }}</div>
              <div class="users__item-email">Email: {{ user.email }}</div>
              <div class="users__item-age">Age: {{ user.age }}</div>
              <div class="users__item-age">
                Posts:
                <div v-for="post in user.posts" :key="post.title">
                  <div>Title: {{ post.title }}</div>
                  <div>Body: {{ post.body }}</div>
                  <div>Is pubished: {{ post.published }}</div>
                </div>
              </div>

              <div class="users__item-ctas">
                <button class="btn" @click="editUser(user)">Edit</button>
                <button class="btn" @click="deleteUser(user)">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
          <button
            class="btn"
            @click="createUser()"
            :disabled="addDisable"
          >
            Add
          </button>

          <button
            class="btn"
            @click="updateUser()"
            :disabled="updateDisable"
          >
            Update
          </button>
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
        addDisable: false,
        updateDisable: true,
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
            this.id = "";
            this.email = "";
            this.name = "";
            this.age = "";
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
        this.addDisable = true,
        this.updateDisable = false;
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

            this.addDisable = false,
            this.updateDisable = true;
            this.id = "";
            this.email = "";
            this.name = "";
            this.age = "";
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
      }
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


<style scoped lang="scss">
  .btn {
    border-radius: 0;
    border: 1px solid rgba(0, 0, 0, .1);
    font-family: 'Brown', sans-serif;
    font-size: 12px;
    padding: 2px 8px;

    &:not(last-child) {
      margin-right: 6px;
    }
  }

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

  .users {
    &__item {
      margin: 0 0 24px 0;
    }

    &__item-content {
      // border-top: 1px dotted grey;
      align-items: flex-start;
      background: #f1faee;
      display: flex;
      flex-direction: column;
      font-size: 14px;
      padding: 10px;
    }

    &__item-ctas {
      margin-top: 12px;
    }
  }
</style>