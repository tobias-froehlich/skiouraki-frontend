<template>
    <div class="row">
        <div class="form-group">
            <label for="name">{{ $t('name') }}</label>
            <input id="name" class="form-control" :class="{invalid: v$.name.$invalid}" type="text" v-model="name"/>
        </div>
        <div class="form-group">
            <label for="password">{{ $t('password') }}</label>
            <input id="password" class="form-control" type="password" v-model="password"/>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" :disabled="v$.$invalid" @click.stop="logIn">{{ $t('logIn') }}</button>
        </div>
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
  name: 'LoginComponent',
    setup() {
    return {
      v$: useVuelidate(),
    }
  },
  components: {
    ErrorModal,
  },
  data() {
    return {
      name: null,
      password: null,
      error: null,
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
    logIn() {
      userApi.logIn(this.name, this.password)
        .then(userName => {
          this.$emit('updateUserName', userName)}
        )
        .then(() => {
            this.name = null
            this.password = null
          }
        )
        .then(() => {
            this.$router.push('/')
          }
        )
        .catch(error => {
          this.error = error.response.text
        })
    },
  },
}
</script>

