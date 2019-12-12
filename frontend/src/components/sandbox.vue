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
      <div class="static" v-bind:class="classObject">
        Test 2
      </div>
    </div>

    <!-- List rendering -->
    <div class="my-list">
      <input type="text" placeholder="Add new name">
      <button v-on:click.prevent="addNew">Add new name</button>
      
    </div><br>

    <!-- Bootstrap + List rendering -->
    <div class="container">
      <div class="row">
        <div class="col-sm" v-for="product in products" :key="product.id">
          <div class="list__item">
            <span>Name: {{ product.name }}</span><br>
            <span>Category: {{ product.category }}</span><br>
            <span>Sku: {{ product.sku }}</span><br>
            <span>Price: {{ product.price }}</span><br>
            <span>Description: {{ product.price }}</span>
          </div>
        </div>
      </div>

      <div class="row">
        <button v-on:click="changeValueMethod">Change SKU</button>
        <button v-on:click="filterMethod()">Filter SKU > 123</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'sandbox',
  data () {
    return {
      msg: 'Vuejs Sandbox',
      my_message: 'Hello second message',
      isActive: true,
      hasError: true,
      classObject: {
        active: true,
        'text-danger': false
      },
      products: [
        {
          name: 'PHANTOM Too Cool',
          category: 't-shirts',
          sku: '123',
          price: '£12.00',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
        {
          name: 'WHITE Beach Floral',
          category: 't-shirts',
          sku: '124',
          price: '£15.00',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
        {
          name: 'BLACK FLoral Skull',
          category: 't-shirts',
          sku: '125',
          price: '£10.00',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        }
      ]
    }
  },
  methods: {
    say: function (message) {
      console.log(message)
      console.log(this.my_message)
    },
    doThis: function() {
      console.log('doThis function');
    },
    changeValueMethod: function() {
      const objIndex = this.products.findIndex(obj => obj.name == 'WHITE Beach Floral');
      this.products[objIndex].sku = '99991'
    },
    filterMethod: function() {
      this.products = this.products.filter(function (product) {
        return product.sku > 123;
      }) 
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {font-family: 'Brown', sans-serif; font-size: 45px; }
  h2 { font-weight: normal;}
  ul {list-style-type: none; padding: 0;}
  li {display: inline-block; margin: 0 10px;}
  a { color: #42b983;}

  .list__item {
    padding: 20px;
    font-family: 'Brown', sans-serif;
    font-size: 14px;
    background: rgb(241, 250, 238);
  }
</style>
