<template>
    <div>
        <div v-if="shoppingLists" class="container">
            <div class="row row-list">
                <div class="col">
                    <button class="btn btn-primary btn-add" @click.stop="gotoFormAddShoppingList"><img src="../assets/img/plus.svg"></button>
                </div>
            </div>
            <div v-if="shoppingLists.length === 0" class="row">
                <div class="col">
                    {{ $t('youDoNotHaveAnyShoppingLists') }}
                </div>
            </div>
            <div class="row row-list" v-for="shoppingList of shoppingLists" :key="shoppingList.id">
                <div class="col-9">
                    <button class="btn btn-shopping-list" @click.stop="() => gotoShoppingList(shoppingList.id)"><img src="../assets/img/list.svg">{{ shoppingList.name }}</button>
                </div>
                <div style="" class="col col-3">
                    <button v-if="shoppingList.owner === userId" class="btn btn-primary btn-remove" @click.stop="() => deleteShoppingList(shoppingList.id)"><img src="../assets/img/x.svg"></button>
                </div>
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
      shoppingLists: null,
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
        .catch(error => {
          if (error.rawResponse === 'ShoppingList not found.') {
            this.$emit('setError', 'error.cannotDeleteShoppingList')
          } else {
            this.$emit('setError', 'error.unexpectedError')
          }
          this.refreshFromDb()
        })
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

