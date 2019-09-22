<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div class="test-block">
      <button v-on:click="say('hi')">My Test Button</button>
      <a v-on:click.prevent="doThis">Do this button</a>
      
      <!-- Test 1 -->
      <div 
        class="static"
        v-bind:class="{ active: isActive, 'text-danger class-list': hasError }"
      >Test 1</div><br>

      <!-- Test 2 -->
      <div 
        class="static"
        v-bind:class="classObject"
      >Test 2</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'sandbox',
  data () {
    return {
      msg: 'My Sandbox',
      my_message: 'Hello second message',
      isActive: true,
      hasError: true,
      classObject: {
        active: true,
        'text-danger': false
      },
    }
  },
  methods: {
    say: function (message) {
      console.log(message)
      console.log(this.my_message)
    },
    doThis: function() {
      console.log('doThis function');
    }
  },
  // computed: {
  //   classObject: function() {
  //     return {
  //       active: this.isActive && !this.error,
  //       'text-danger': this.error && this.error.type === 'fatal'
  //     }
  //   }
  // },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 { font-weight: normal;}
  ul {list-style-type: none; padding: 0;}
  li {display: inline-block; margin: 0 10px;}
  a { color: #42b983;}
</style>
