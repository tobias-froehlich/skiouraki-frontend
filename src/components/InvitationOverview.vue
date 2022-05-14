<template>
    <div>
        <div class="container">
            <div class="row row-list">
                <div class="col">
                </div>
            </div>
            <div class="row row-list" v-for="shoppingList of shoppingLists" :key="shoppingList.id">
                <div class="col-9">
                    <button class="btn btn-shopping-list" @click.stop="() => acceptInvitation(shoppingList.id)">
                        <img src="../assets/img/list.svg">
                        {{ shoppingList.name }}
                    </button>
                </div>
                <div class="col col-3">
                    <button class="btn btn-primary btn-remove" @click.stop="() => rejectInvitation(shoppingList.id)">
                        <img src="../assets/img/x.svg">
                    </button>
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
      shoppingLists: [],
    }
  },
  validations: {
  },
  methods: {
    refreshFromDb() {
      shoppingListApi.getInvitations()
        .then(shoppingLists => this.shoppingLists = shoppingLists)
    },
    acceptInvitation(shoppingListId) {
      shoppingListApi.acceptInvitation(shoppingListId)
        .then(() => this.refreshFromDb())
        .catch(error => {
          if (error.rawResponse === 'Invitation not found.') {
            this.$emit('setError', 'error.theInvitationCannotBeAccepted')
          } else{
            this.$emit('setError', 'error.unexpectedError')
          }
          this.refreshFromDb()
        })
    },
    rejectInvitation(shoppingListId) {
      shoppingListApi.rejectInvitation(shoppingListId)
        .then(() => this.refreshFromDb())
        .catch(error => {
          if (error.rawResponse === 'Cannot reject invitation.') {
            this.$emit('setError', 'error.theInvitationCannotBeRejected')
          } else{
            this.$emit('setError', 'error.unexpectedError')
          }
          this.refreshFromDb()
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

