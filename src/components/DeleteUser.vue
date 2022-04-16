<template>
    <div class="row">
        <div class="form-group">
            <label for="name">{{ $t('confirmUserName') }}</label>
            <input id="name" class="form-control" :class="{invalid: v$.name.$invalid}" type="text" v-model="name"/>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" :disabled="v$.$invalid" @click.stop="deleteUser">{{ $t('deleteAccount') }}</button>
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
      equalsUserName(value) {
        return value === userApi.getUserName()
      },
    },
  },
  methods: {
    deleteUser() {
      userApi.deleteUser()
        .then(() => {
          this.$emit('updateUserName', null)
          this.name = null
          this.password = null
          this.$emit('setInfo', 'info.userDeleted')
          this.$router.push('/')
        })
        .catch(() => {
          this.$emit('setError', 'error.unexpectedError')
        })
    },
  },
}
</script>

