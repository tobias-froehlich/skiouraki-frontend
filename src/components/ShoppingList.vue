<template>
    <div>
        <div class="container">
            <div class="row">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <button class="btn" @click.stop="() => tab='ITEMS'">
                            Items
                        </button>
                    </li>
                    <li class="nav-item">
                        <button class="btn" @click.stop="() => tab='MEMBERS'">
                            Members
                        </button>
                    </li>
                </ul>
            </div>
            <div class="row">
                <div class="col">
                    <shopping-list-items
                            v-if="tab==='ITEMS' && enrichedShoppingList"
                            :enrichedShoppingList="enrichedShoppingList"
                            @refresh="refresh"
                            @refresh-from-db="refreshFromDb"
                            @setError="error => $emit('setError', error)"
                            @setInfo="info => $emit('setInfo', info)"
                    ></shopping-list-items>
                    <shopping-list-members
                            v-if="tab==='MEMBERS'"
                            :enrichedShoppingList="enrichedShoppingList"
                            @refresh-from-db="refreshFromDb"
                            @setError="error => $emit('setError', error)"
                    ></shopping-list-members>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import userApi from '../apis/userApi.js'
import shoppingListApi from '../apis/shoppingListApi.js'
import ShoppingListItems from './ShoppingListItems.vue'
import ShoppingListMembers from './ShoppingListMembers.vue'

export default {
  name: 'ShoppingList',
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  components: {
    ShoppingListItems,
    ShoppingListMembers,
  },
  props: {
    shoppingListId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      userId: userApi.getUserId(),
      tab: 'ITEMS',
      enrichedShoppingList: null,
    }
  },
  validations: {
  },
  methods: {
    refresh(enrichedShoppingList) {
      this.enrichedShoppingList = enrichedShoppingList
    },
    refreshFromDb() {
      shoppingListApi.getEnrichedShoppingList(this.shoppingListId)
        .then(enrichedShoppingList => this.enrichedShoppingList = enrichedShoppingList)
        .catch(error => {
          if (error.rawResponse === 'ShoppingList not found.') {
            this.$emit('setError', 'error.shoppingListNotFound')
          } else {
            this.$emit('setError', 'error.unexpectedError')
          }
          this.$router.push({path: '/shopping-list-overview'})
        })
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

