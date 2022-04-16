<template>
    <div class="row">
        <div class="form-group">
            <label for="password">{{ $t('password') }}</label>
            <input id="password" class="form-control" :class="{invalid: v$.equalPasswords.$invalid}" type="password" v-model="password"/>
        </div>
        <div class="form-group">
            <label for="repeatPassword">{{ $t('repeatPassword') }}</label>
            <input id="repeatPassword" class="form-control" :class="{invalid: v$.equalPasswords.$invalid}" type="password" v-model="repeatedPassword"/>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" :disabled="v$.$invalid" @click.stop="changePassword">{{ $t('changePassword') }}</button>
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
  name: 'ChangePassword',
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
    }
  },
  validations: {
    equalPasswords(value) {
      return value.password === value.repeatedPassword
    },
  },
  methods: {
    changePassword() {
      userApi.changePassword(this.password)
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

