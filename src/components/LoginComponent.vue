<template>
    <div class="row">
        <div class="form-group">
            <label for="name">{{ $t('name') }}</label>
            <input id="name" class="form-control" :class="{invalid: v$.name.$invalid}" type="text" v-model="name"/>
        </div>
        <div class="form-group">
            <label for="password">{{ $t('password') }}</label>
            <input id="password" class="form-control" :class="{invalid: v$.password.$invalid}" type="password" v-model="password"/>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" :disabled="v$.$invalid" @click.stop="logIn">{{ $t('logIn') }}</button>
        </div>
    </div>
</template>

<script>
import userApi from '../apis/userApi.js'
import useVuelidate from '@vuelidate/core'

export default {
  name: 'LoginComponent',
    setup() {
    return {
      v$: useVuelidate(),
    }
  },
  components: {},
  data() {
    return {
      name: null,
      password: null,
    }
  },
  validations: {
      password: {
      allowedLength(value) {
        return value && value.length <= userApi.maximalPasswordLength && value.length >= userApi.minimalPasswordLength
      }
    },
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
    logIn() {
      userApi.logIn(this.name, this.password)
        .then(userName => {
          this.$emit('updateUserName', userName)
          this.name = null
          this.password = null
          this.$router.push({path: '/'})
        })
        .catch(error => {

          if (error.response && error.response.text === 'User not found.') {
            this.$emit('setError', 'error.userNotFound')
          } else if (error.rawResponse && error.rawResponse === 'Wrong credentials.') {
            this.$emit('setError', 'error.wrongPassword')
          } else {
            this.$emit('setError', 'error.unexpectedError')
          }
        })

    },
  },
}
</script>

