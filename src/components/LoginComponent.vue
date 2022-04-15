<template>
    <div class="row">
        <div class="form-group">
            <label for="name">{{ $t('name') }}</label>
            <input id="name" class="form-control" type="text" v-model="name"/>
        </div>
        <div class="form-group">
            <label for="password">{{ $t('password') }}</label>
            <input id="password" class="form-control" type="password" v-model="password"/>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" @click.stop="logIn">{{ $t('logIn') }}</button>
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

export default {
  name: 'LoginComponent',
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

