<template>
    <div class="my-tasks">
      <p>{{ msg }}</p>
      <div class="container">
        <div class="row">
          <div class="col-sm-3 tasks__item" v-for="task in tasks" :key="task.title">
            <div class="tasks__item-title">Title: {{ task.title }}</div>
            <div class="tasks__item-description">Description: {{ task.description }}</div>
            <div class="tasks__item-status">Status: {{ task.status }}</div>
            <div class="tasks__item-start">Start date: {{ task.startDate }}</div>
            <div class="tasks__item-end">Completopm date: {{ task.completionDate }}</div>
            <div class="tasks__item-owner">Owner: {{ task.owner.name }}</div>
          </div>
        </div>
      </div>

      <div class="add_new">
      <h2>Add new task:</h2>
      <div class="field">
        <input type="text" v-model="title" placeholder="Title">
      </div>

      <div class="field">
        <input type="text" v-model="description" placeholder="Description">
      </div>

      <div class="field">
        <input type="text" v-model="status" placeholder="Status">
      </div>

      <div class="field">
        <input type="text" v-model="startDate" placeholder="Start Date">
      </div>

      <div class="field">
        <input type="text" v-model="completionDate" placeholder="Completion Date">
      </div>

      <div class="field">
        <input type="text" v-model="owner" placeholder="Owner">
      </div>

      <div class="field">
          <button class="btn" @click="createTask()">
            Create
          </button>
      </div>
    </div>
    </div>
</template>

<script>
import { MY_TASKS } from '../graphql/myTasks'
import { MY_TASK_ADD } from '../graphql/myTaskAdd'

export default {
  name: 'tasks',
  data () {
    return {
      msg: 'Tasks component',
      tasks: [],
      title: '',
      description: '',
      status: '',
      startDate: '',
      completionDate: '',
      owner: '',
    }
  },
  apollo: {
    tasks: {
      query: MY_TASKS,
    }
  },
  methods: {
    createTask() {
      const title = this.title
      const description = this.description
      const status = this.status
      const startDate = this.startDate
      const completionDate = this.completionDate
      const owner = this.owner

      this.$apollo.mutate({
        mutation: MY_TASK_ADD,
        variables: {
          title,
          description,
          status,
          startDate,
          completionDate,
          owner,
        },
        update: (cache, {data: {createTask}}) => {
          const data = cache.readQuery({query: MY_TASKS})
          data.tasks.push(createTask)
          cache.writeQuery({ query: MY_TASKS, data })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createTask: {
            __typename: 'Task',
            _id:-1,
            title: -1,
            description,
            status,
            startDate,
            completionDate,
            owner,
          }
        },
      })
    },
  },
}
</script>

<style scoped lang="scss">

</style>