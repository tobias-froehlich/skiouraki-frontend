<template>
    <div>
        <div class="form-group">
            <label for="name">{{ $t('name') }}</label>
            <input id="name" class="form-control" type="text" v-model="name"/>
        </div>
        <div class="form-group">
            <label for="password">{{ $t('password') }}</label>
            <input id="password" class="form-control" type="password" v-model="password"/>
        </div>
        <div class="form-group">
            <label for="repeatPassword">{{ $t('repeatPassword') }}</label>
            <input id="repeatPassword" class="form-control" type="password" v-model="repeatedPassword"/>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" @click.stop="signUp">{{ $t('signUp') }}</button>
        </div>
        <button @click.stop="getAll"> get all</button>
    </div>
</template>

<script>
import userApi from '../apis/userApi.js'
export default {
  name: 'SignupComponent',
  components: {},
  props: {},
  computed: {},
  data() {
    return{
      name: null,
      password: null,
      repeatedPassword: null
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
    },
    getAll() {
      userApi.getAll()
    },
  }
}
</script>