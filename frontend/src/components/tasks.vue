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

      <div class="row">
        <div class="col-sm-3">
          <h2 class="add__title">Add new task:</h2>

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
            <button class="btn" @click="createTask()">Create</button>
          </div>
        </div>
      </div>

      <div class="row drag-list">
        <div class="col-sm-3">
          <h2 class="add__title">List 1</h2>

          <draggable
            class="list-group" 
            :list="tasks"
            v-bind="dragOptions"
          >
            <div
              class="list-group-item"
              v-for="element in tasks" :key="element.title"
            >
              {{ element.title }}
            </div>
          </draggable>
        </div>

        <div class="col-sm-3">
          <h2 class="add__title">List 2</h2>

          <draggable
            class="list-group" 
            :list="secondList"
            v-bind="dragOptions"
          >
            <div
              class="list-group-item"
              v-for="element in secondList" :key="element.title"
            >
              {{ element.title }}
            </div>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { MY_TASKS } from '../graphql/myTasks'
import { MY_TASK_ADD } from '../graphql/myTaskAdd'

export default {
  name: 'tasks',
  components: {
    draggable
  },
  data () {
    return {
      msg: 'Tasks component',
      tasks: [],
      secondList: [],
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
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
}
</script>

<style scoped lang="scss">
  .drag-list {
    background-color: #e9ecef;
    padding: 0 0 64px 0;
  }

  .ghost {
    opacity: 0.5;
    background: #e9ecef;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }

  .add__title {
    padding-top: 32px;
  }

  .list-group {
    display: flex;
    flex-direction: column;
  }
</style>