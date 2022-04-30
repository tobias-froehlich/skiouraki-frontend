<template>
    <div>
        <div class="container">
            <button class="btn btn-primary" @click.stop="gotoFormAddShoppingList">+</button>
            <div class="row" v-for="shoppingList of shoppingLists" :key="shoppingList.id">
                <span>
                    {{ shoppingList.name }}
                    <button class="btn btn-primary" @click.stop="() => gotoFormInviteForShoppingList(shoppingList.id)">{{ $t('invite') }}</button>
                    <button class="btn btn-primary" @click.stop="() => deleteShoppingList(shoppingList.id)">-</button>
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
    gotoFormInviteForShoppingList(shoppingListId) {
      this.$router.push({name: 'FormInviteForShoppingList', params: {shoppingListId: shoppingListId}})
    },
    deleteShoppingList(shoppingListId) {
      shoppingListApi.deleteShoppingList(shoppingListId)
        .then(() => this.refreshFromDb())
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

