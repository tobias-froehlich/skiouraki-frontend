<template>
    <div>
        <div class="form-group">
            <label for="name">{{ $t('name') }}</label>
            <input id="name" class="form-control" :class="{invalid: v$.name.$invalid}" type="text" v-model="name"/>
        </div>
        <div class="form-group">
            <label for="password">{{ $t('password') }}</label>
            <input id="password" class="form-control" :class="{invalid: v$.password.$invalid}" type="password" v-model="password"/>
        </div>
        <div class="form-group">
            <label for="repeatPassword">{{ $t('repeatPassword') }}</label>
            <input id="repeatPassword" class="form-control" :class="{invalid: v$.equalPasswords.$invalid}" type="password" v-model="repeatedPassword"/>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" :disabled="v$.$invalid" @click.stop="signUp">{{ $t('signUp') }}</button>
        </div>
    </div>
</template>

<script>
import userApi from '../apis/userApi.js'
import useVuelidate from '@vuelidate/core'

export default {
  name: 'SignupComponent',
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  components: {},
  props: {},
  validations: {
    password: {
      allowedLength(value) {
        return value && value.length <= userApi.maximalPasswordLength && value.length >= userApi.minimalPasswordLength
      }
    },
    equalPasswords(value) {
      return value.password === value.repeatedPassword
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
  computed: {},
  data() {
    return{
      name: null,
      password: null,
      repeatedPassword: null,
      error: null,
      info: null,
    }
  },
  methods: {
    signUp() {
      userApi.signUp(this.name, this.password)
      .then(() => {
        this.name = null
        this.password = null
        this.repeatedPassword = null
        this.$emit('setInfo', 'info.accountCreatedLogIn')
        this.$router.push({path: '/login'})
      })
      .catch(error => {
        if (error.rawResponse === 'The user name already exists.') {
          this.$emit('setError', 'error.theUserNameAlreadyExists')
        } else {
          this.$emit('setError','error.unexpectedError')
        }
      })
    },
    getAll() {
      userApi.getAll()
    },
  }
}
</script>