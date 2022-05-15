<template>
    <div class="form-modal">
        <div class="form-modal-container">
            <div class="form-modal-content">
                <div v-if="!userToBeInvited">
                    <div class="form-group">
                        <label for="name">{{ $t('name') }}</label>
                        <input id="name" class="form-control" :class="{invalid: v$.name.$invalid}" type="text" v-model="name"/>
                    </div>
                    <button class="btn btn-primary" :disabled="v$.name.$invalid" @click.stop="searchUser">{{ $t('search') }}</button>
                    <button class="btn btn-primary" @click.stop="() => $emit('cancel')">{{ $t('cancel') }}</button>
                </div>
                <div v-else>
                    <div class="user-field"><img src="../assets/img/squirrel_outline.svg">&nbsp;{{ userToBeInvited.name }}</div>
                    <button class="btn btn-primary" @click.stop="inviteUser">{{ $t('invite') }}</button>
                    <button class="btn btn-primary" @click.stop="() => $emit('cancel')">{{ $t('cancel') }}</button>
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
  name: 'FormInviteForShoppingList',
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  components: {},
  props: {
    shoppingListId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      name: null,
      shoppingList: null,
      userToBeInvited: null,
    }
  },
  validations: {
    name: {
      allowedLength(value) {
        return value && value.length <= userApi.maximalNameLength && value.length >= userApi.minimalNameLength
      },
      charactersAreValid(value) {
        for (let c of value) {
          if (!userApi.validCharacters.includes(c)) {
            return false
          }
        }
        return true
      },
    },
  },
  methods: {
    searchUser() {
      userApi.getUserByName(this.name)
        .then(user => this.userToBeInvited = user)
        .catch(error => {
          if (error.response && error.response.text === 'User not found.') {
            this.$emit('setError', 'error.userNotFound')
          } else {
            this.$emit('setError', 'error.unexpectedError')
          }
        })
    },
    inviteUser() {
      shoppingListApi.inviteUser(this.shoppingListId, this.userToBeInvited.id)
        .then(() => {
          this.$emit('setInfo', 'info.theUserIsInvited')
          this.$emit('refreshFromDb')
          this.$emit('cancel')
        })
        .catch(error => {
          if (error.rawResponse === 'User not found.') {
            this.$emit('setError', 'error.userNotFound')
          } else if (error.rawResponse === 'ShoppingList not found.') {
            this.$emit('setError', 'error.shoppingListNotFound')
          } else if (error.rawResponse === 'Cannot invite user to ShoppingList.') {
            this.$emit('setError', 'error.theUserCannotBeInvitedToTheShoppingList')
          } else{
            this.$emit('setError', 'error.unexpectedError')
          }
          this.userToBeInvited = null
        })
    },
  },
  created() {
    shoppingListApi.getShoppingList(this.shoppingListId)
      .then(shoppingList => this.shoppingList = shoppingList)
  },
}
</script>

