<template>
    <div>
        <input type="text" v-model="name"/>
        <input type="text" v-model="password"/>
        <button @click.stop="signUp">{{ $t('signUp') }}</button>
        <button @click.stop="getAll"> get all</button>
    </div>
</template>

<script>
import userApi from '../apis/userApi.js'
export default {
  name: 'SignupComponent',
  components: {},
  props: {},
  validations: {},
  computed: {},
  data() {
    return{
      name: null,
      password: null,
    }
  },
  methods: {
    signUp() {
      userApi.signUp(this.name, this.password)
    },
    getAll() {
      userApi.getAll()
    },
  }
}
</script>