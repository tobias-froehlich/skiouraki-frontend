<template>
  <header-bar :userName="userName" @updateUserName="updateUserName"></header-bar>
  <p>

  </p>
  <router-view @updateUserName="updateUserName"></router-view>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue'

export default {
  name: 'App',
  components: {
    HeaderBar,
  },
  data() {
    return {
      userName: null,
    }
  },
  methods: {
    updateUserName(userName) {
      this.userName = userName
    },
  },
}
</script>

<style lang="scss">
@import "./assets/stylesheets/style.scss"
</style>
