<template>
    <div>
        <div class="container p-0">
            <div class="row row-list">
                <div class="col">
                    <button v-if="enrichedShoppingList.owner === userId" class="btn btn-primary btn-add" @click.stop="gotoFormInviteForShoppingList"><img src="../assets/img/plus.svg"></button>
                </div>
            </div>
            <div class="row row-list" v-for="member of enrichedShoppingList.invitedUsers" :key="member.id">
                <div class="col col-9 p-0">
                    <div class="user-field"><img src="../assets/img/squirrel_outline.svg">&nbsp;{{ member.name }}</div>
                </div>
                <div class="col col-3">
                    <button v-if="(enrichedShoppingList.owner===userId)" class="btn btn-primary btn-remove" @click.stop="() => withdrawInvitation(member.id)"><img src="../assets/img/x.svg"></button>
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
    gotoFormInviteForShoppingList() {
      this.$router.push({name: 'FormInviteForShoppingList', params: {shoppingListId: this.enrichedShoppingList.id}})
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
  },
  created() {
  },
}
</script>

