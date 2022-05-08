<template>
    <div>
        <div class="container">
            <button class="btn btn-primary btn-add" @click.stop="gotoFormAddShoppingList"><i class="bi bi-arrow-right"></i></button>
            <div class="row" v-for="shoppingList of shoppingLists" :key="shoppingList.id">
                <span>
                    <button class="btn btn-primary" @click.stop="() => gotoShoppingList(shoppingList.id)">{{ shoppingList.name }}</button>
                    <button v-if="shoppingList.owner === userId" class="btn btn-primary" @click.stop="() => deleteShoppingList(shoppingList.id)">-</button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import userApi from '../apis/userApi.js'
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
      userId: userApi.getUserId(),
      shoppingLists: [],
    }
  },
  validations: {
  },
  methods: {
    refreshFromDb() {
      shoppingListApi.getShoppingLists()
        .then(shoppingLists => this.shoppingLists = shoppingLists)
    },
    gotoFormAddShoppingList() {
      this.$router.push({path: '/form-add-shopping-list'})
    },
    deleteShoppingList(shoppingListId) {
      shoppingListApi.deleteShoppingList(shoppingListId)
        .then(() => this.refreshFromDb())
    },
    gotoShoppingList(shoppingListId) {
      this.$router.push({name: 'ShoppingList', params: {shoppingListId: shoppingListId}})
    },
  },
  created() {
    if (userApi.getUserId()) {
      this.refreshFromDb()
    } else {
      this.$router.push({path: '/login'})
    }
  },
}
</script>

