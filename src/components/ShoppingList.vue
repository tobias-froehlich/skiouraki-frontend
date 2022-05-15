<template>
    <div>
        <div class="container">
            <div class="row">

                <ul class="nav nav-tabs">
                    <li class="nav-item" :data-active-tab="tab === 'ITEMS'">
                        <button class="btn" @click.stop="() => tab='ITEMS'">
                            {{ $t('list') }}
                        </button>
                    </li>
                    <li class="nav-item" :data-active-tab="tab === 'MEMBERS'">
                        <button class="btn" @click.stop="() => tab='MEMBERS'">
                            {{ $t('members') }}
                        </button>
                    </li>
                    <li class="nav-item" :data-active-tab="tab === 'INVITATIONS'">
                        <button class="btn" @click.stop="() => tab='INVITATIONS'">
                            {{ $t('invitations') }}
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
                            v-if="tab==='MEMBERS' && enrichedShoppingList"
                            :enrichedShoppingList="enrichedShoppingList"
                            @refresh-from-db="refreshFromDb"
                            @setError="error => $emit('setError', error)"
                    ></shopping-list-members>
                    <shopping-list-invitations
                            v-if="tab==='INVITATIONS' && enrichedShoppingList"
                            :enrichedShoppingList="enrichedShoppingList"
                            @refresh-from-db="refreshFromDb"
                            @setError="error => $emit('setError', error)"
                            @setInfo="info => $emit('setInfo', info)"
                    ></shopping-list-invitations>
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
import ShoppingListInvitations from './ShoppingListInvitations.vue'

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
    ShoppingListInvitations,
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

