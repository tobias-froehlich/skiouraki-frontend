<template>
    <div>
        <div class="container">
            <div class="row" v-for="shoppingList of shoppingLists" :key="shoppingList.id">
                <span>
                    {{ shoppingList.name }}
                    <button class="btn btn-primary" @click.stop="() => acceptInvitation(shoppingList.id)">
                        {{ $t('accept') }}
                    </button>
                    <button class="btn btn-primary" @click.stop="() => rejectInvitation(shoppingList.id)">
                        {{ $t('reject') }}
                    </button>
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

