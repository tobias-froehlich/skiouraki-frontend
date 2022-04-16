<template>
    <div class="row">
        <div class="form-group">
            <label for="name">{{ $t('name') }}</label>
            <input id="name" class="form-control" :class="{invalid: v$.name.$invalid}" type="text" v-model="name"/>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" :disabled="v$.$invalid" @click.stop="changeName">{{ $t('changeUserName') }}</button>
        </div>
    </div>
</template>

<script>
import userApi from '../apis/userApi.js'
import useVuelidate from '@vuelidate/core'

export default {
  name: 'ChangeUserName',
    setup() {
    return {
      v$: useVuelidate(),
    }
  },
  components: {},
  data() {
    return {
      name: null,
    }
  },
  validations: {
    name: {
      notTooLong(value) {
        return value && value.length <= userApi.maximalNameLength
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
    changeName() {
      userApi.changeName(this.name)
        .then(userName => {
          this.$emit('updateUserName', userName)
          this.name = null
          this.password = null
          this.$emit('setInfo', 'info.userNameChangedLogIn')
          this.$router.push('/login')
        })
        .catch(error => {
          if (error.rawResponse === 'The new user name already exists.') {
            this.$emit('setError', 'error.theUserNameAlreadyExists')
          } else {
            this.$emit('setError', 'error.unexpectedError')
          }
        })
    },
  },
}
</script>

