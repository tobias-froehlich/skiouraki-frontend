<template>
    <div>
        <div class="container">
            <div button class="btn btn-primary" @click.stop="gotoFormAddShoppingList">+</div>
            <div class="row" v-for="shoppingList of shoppingLists" :key="shoppingList.id">
                {{ shoppingList.name }}
            </div>
        </div>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import shoppingListApi from '../apis/shoppingListApi.js'

export default {
  name: 'ShoppingListOverview',
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  components: {},
  data() {
    return {
      shoppingLists: [],
    }
  },
  validations: {
  },
  methods: {
    gotoFormAddShoppingList() {
      this.$router.push({path: '/form-add-shopping-list'})
    },
  },
  created() {
    shoppingListApi.getShoppingLists()
      .then(shoppingLists => this.shoppingLists = shoppingLists)
  },
}
</script>

