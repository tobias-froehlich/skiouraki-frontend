<template>
    <div>
        <p>Members:</p>
        <div class="container">
            <div class="row" v-for="member of enrichedShoppingList.members" :key="member.id">
                {{ member.name }}
                <button v-if="(enrichedShoppingList.owner===userId) && (enrichedShoppingList.owner!==member.id)" class="btn btn-primary" @click.stop="() => removeUser(member.id)">remove</button>
                <button v-if="(enrichedShoppingList.owner!==userId) && (userId==member.id)" class="btn btn-primary" @click.stop="() => leaveShoppingList()">leave</button>
            </div>
        </div>
        <p>invited Users:</p>
        <div class="container">
            <div class="row" v-for="member of enrichedShoppingList.invitedUsers" :key="member.id">
                {{ member.name }}
                <button v-if="(enrichedShoppingList.owner===userId)" class="btn btn.primary" @click.stop="() => withdrawInvitation(member.id)">withdraw</button>
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
    withdrawInvitation(userId) {
      shoppingListApi.withdrawInvitation(this.enrichedShoppingList.id, userId)
        .then(() => this.$emit('refreshFromDb'))
        .catch(error => {
          if (error.rawResponse === 'Cannot withdraw invitation because it was not found.') {
            this.$emit('setError', 'error.cannotWithdrawInvitation')
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

