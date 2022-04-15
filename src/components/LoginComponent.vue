<template>
    <div>
        <input type="text" v-model="name"/>
        <input type="password" v-model="password"/>
        <button @click.stop="logIn">{{ $t('logIn') }}</button>
    </div>
</template>

<script>
import userApi from '../apis/userApi.js'

export default {
  name: 'LoginComponent',
  components: {},
  data() {
    return {
      name: null,
      password: null,
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
    },
  },
}
</script>

