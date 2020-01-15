<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div class="test-block">
      <button class="btn" v-on:click="say('hi')">My Test Button</button>
      <a v-on:click.prevent="doThis">Do this button</a>

      <!-- Test 1 -->
      <div
        class="static"
        v-bind:class="{ active: isActive, 'text-danger class-list': hasError }"
      >
        Test 1
      </div><br>

      <!-- Test 2 -->
      <div class="static" v-bind:class="classObject">
        Lorem ipsum
      </div>
    </div><br>

    <!-- Bootstrap + List rendering -->
    <div class="container">

      <div class="list__filters">
        <div class="row">
          <div class="col-sm-3 list__filter-type" v-for="filter in filters" :key="filter.type">
            <strong class="list__filter-title">{{ filter.type }}</strong>

            <label class="list__filter" v-for="item in filter.items" :key="item.name">
              <input type="radio" v-model="selectedFilter" :value="item.value">
              {{ item.name }}
            </label>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-3" v-for="product in myFilter" :key="product.id">
          <div class="list__item">
            <span>Name: {{ product.name }}</span><br>
            <span>Category: {{ product.category }}</span><br>
            <span>Sku: {{ product.sku }}</span><br>
            <span>Price: {{ product.price }}</span><br>
            <span>Description: {{ product.description }}</span>
          </div>
        </div>

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
      filters: [
        {
          type: 'Category',
          items: [
            {
              name: 'All',
              value: 'All'
            },
            {
              name: 'T-Shirts',
              value: 't-shirts'
            },
            {
              name: 'Sunglasses',
              value: 'sunglasses',
            },
          ]
        },
        {
          type: 'Color',
          items: [
            {
              name: 'White',
              value: 'white',
            },
            {
              name: 'Phantom',
              value: 'phantom',
            },
            {
              name: 'Matte',
              value: 'matte'
            },
            {
              name: 'Pink',
              value: 'pink'
            },
            {
              name: 'Grey',
              value: 'grey'
            }
          ]
        },
        {
          type: 'Size',
          items: [
            {
              name: 'Small',
              value: 'small',
            },
            {
              name: 'Medium',
              value: 'medium',
            },
            {
              name: 'Large',
              value: 'large'
            },
            {
              name: 'Extra Large',
              value: 'extra-large'
            }
          ]
        },
      ],
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
        },
        {
          name: 'Matte black sunglasses',
          category: 'sunglasses',
          sku: '126',
          price: '£230.10',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
        {
          name: 'Pink sunglasses',
          category: 'sunglasses',
          sku: '127',
          price: '£130.10',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
        {
          name: 'Grey horn sunglasses',
          category: 'sunglasses',
          sku: '128',
          price: '£110.10',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        }
      ],
      selectedFilter: "All"
    }
  },
  methods: {
    say(message) {
      console.log(`${message} and ${this.my_message}`)
    },
    doThis() {
      console.log('doThis function')
    },
    changeValueMethod() {
      const objIndex = this.products.findIndex(obj => obj.name == 'WHITE Beach Floral');
      this.products[objIndex].sku = '99991'
    },
    showAll() {
      console.log(this.products);
    },
    filterMethod(parameter) {
      this.products = this.products.filter(product => product.category == parameter);
    }
  },
  computed: {
    myFilter() {
      const selectedValue = this.selectedFilter;

      if (selectedValue == 'All') {
        return this.products;
      } else {
        return this.products.filter((product) => product.category == selectedValue);
      }
    }
  }
}
</script>

<style scoped lang="scss">
  h1 {font-family: 'Brown', sans-serif; font-size: 45px; }
  h2 { font-weight: normal;}
  ul {list-style-type: none; padding: 0;}
  li {display: inline-block; margin: 0 10px;}
  a { color: #42b983;}

  .btn {
    border-radius: 0;
    border: 1px solid rgba(0, 0, 0, .1);
    font-family: 'Brown', sans-serif;
    font-size: 12px;
    padding: 4px 12px;

    &:not(last-child) {
      margin-right: 12px;
    }
  }

  .list {
    &__filters {
      margin-bottom: 24px;
    }

    &__filter {
      border: 1px solid rgba(0, 0, 0, .1);
      font-size: 12px;
      padding: 4px 12px;

      &:not(last-child) {
        margin-right: 12px;
      }

      input[type="radio"] {
        margin-right: 10px;
      }
    }

    &__filter-type {
      text-align: left;
    }

    &__filter-title {
      display: block;
      font-size: 12px;
      margin-bottom: 12px;
      text-transform: uppercase;
    }

    &__item {
      background: rgb(241, 250, 238);
      // font-family: 'Brown', sans-serif;
      font-size: 14px;
      margin-bottom: 24px;
      padding: 20px;
    }
  }
</style>
