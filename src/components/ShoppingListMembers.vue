<template>
    <div>
        <div class="container p-0">
            <div class="row row-list" v-for="member of enrichedShoppingList.members" :key="member.id">
                <div class="col col-9 p-0">
                    <div class="user-field"><img src="../assets/img/squirrel.svg">&nbsp;{{ member.name }}</div>
                </div>
                <div class="col col-3">
                    <button v-if="(enrichedShoppingList.owner===userId) && (enrichedShoppingList.owner!==member.id)" class="btn btn-primary btn-remove" @click.stop="() => removeUser(member.id)"><img src="../assets/img/x.svg"></button>
                    <button v-if="(enrichedShoppingList.owner!==userId) && (userId==member.id)" class="btn btn-primary" @click.stop="() => leaveShoppingList()">leave</button>
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
  name: 'ShoppingListMembers',
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  components: {},
  props: {
    enrichedShoppingList: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      userId: userApi.getUserId()
    }
  },
  validations: {
  },
  methods: {
    removeUser(userId) {
      shoppingListApi.removeUser(this.enrichedShoppingList.id, userId)
        .then(() => this.$emit('refreshFromDb'))
        .catch(error => {
          alert(JSON.stringify(error))
          if (error.rawResponse === 'Cannot leave ShoppingList.') {
            this.$emit('setError', 'error.cannotRemoveUserFromShoppingList')
          } else {
            this.$emit('setError', 'error.unexpectedError')
          }
          this.$emit('refreshFromDb')
        })
    },
    leaveShoppingList() {
      shoppingListApi.leaveShoppingList(this.enrichedShoppingList.id)
        .then(() => {
          this.$router.push({path: '/shopping-list-overview'})
        })
        .catch(error => {
          if (error.rawResponse === 'Cannot leave ShoppingList.') {
            this.$emit('setError', 'error.cannotLeaveShoppingList')
          } else {
            this.$emit('setError', 'error.unexpectedError')
          }
          this.$router.push({path: '/shopping-list-overview'})
        })
    },
  },
  created() {
  },
}
</script>

