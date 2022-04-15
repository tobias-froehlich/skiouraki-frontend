<template>
    <div>
        <div class="form-group">
            <label for="name">{{ $t('name') }}</label>
            <input id="name" class="form-control" :class="{invalid: v$.name.$invalid}" type="text" v-model="name"/>
        </div>
        <div class="form-group">
            <label for="password">{{ $t('password') }}</label>
            <input id="password" class="form-control" :class="{invalid: v$.equalPasswords.$invalid}" type="password" v-model="password"/>
        </div>
        <div class="form-group">
            <label for="repeatPassword">{{ $t('repeatPassword') }}</label>
            <input id="repeatPassword" class="form-control" :class="{invalid: v$.equalPasswords.$invalid}" type="password" v-model="repeatedPassword"/>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" :disabled="v$.$invalid" @click.stop="signUp">{{ $t('signUp') }}</button>
        </div>
        <button @click.stop="getAll"> get all</button>
        {{ v$.name.$invalid }}
        <error-modal
                :error="error"
                @resetError="() => error = null"
        ></error-modal>
    </div>
</template>

<script>
import userApi from '../apis/userApi.js'
import ErrorModal from './ErrorModal.vue'
import useVuelidate from '@vuelidate/core'

export default {
  name: 'SignupComponent',
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  components: {
    ErrorModal,
  },
  props: {},
  validations: {
    equalPasswords(value) {
      return value.password === value.repeatedPassword
    },
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
  computed: {},
  data() {
    return{
      name: null,
      password: null,
      repeatedPassword: null,
      error: null,
    }
  },
  methods: {
    signUp() {
      userApi.signUp(this.name, this.password)
      .then(() => {
        this.name = null
        this.password = null
        this.repeatedPassword = null
      })
      .catch(error => {
        alert(JSON.stringify(error))
        this.error = error.rawResponse
      })
    },
    getAll() {
      userApi.getAll()
    },
  }
}
</script>