<template>
    <div>
        <div v-if="show === 'OVERVIEW'" class="container p-0">
            <div class="row row-list">
                <div class="col">
                    <button v-if="enrichedShoppingList.owner === userId" class="btn btn-primary btn-add" @click.stop="() => show = 'INVITE'"><img src="../assets/img/plus.svg"></button>
                </div>
            </div>
            <div v-if="enrichedShoppingList.invitedUsers.length === 0" class="row">
                <div class="col">
                    {{ $t('noUsersAreInvitedToTheShoppingList') }}
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
        <form-invite-for-shopping-list
                v-else-if="show === 'INVITE'"
                :shoppingListId="enrichedShoppingList.id"
                @setInfo="info => $emit('setInfo', info)"
                @setError="error => $emit('setError', error)"
                @cancel="() => show='OVERVIEW'"
                @refreshFromDb="() => $emit('refreshFromDb')"
        >
        </form-invite-for-shopping-list>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import userApi from '../apis/userApi.js'
import shoppingListApi from '../apis/shoppingListApi.js'
import FormInviteForShoppingList from './FormInviteForShoppingList.vue'

export default {
  name: 'ShoppingListMembers',
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  components: {
    FormInviteForShoppingList,
  },
  props: {
    enrichedShoppingList: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      userId: userApi.getUserId(),
      show: 'OVERVIEW',
    }
  },
  validations: {
  },
  methods: {
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

