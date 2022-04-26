<template>
  <div class="container m-0 p-0">
    <header-bar :userName="userName" @updateUserName="updateUserName"></header-bar>
    <router-view
            @updateUserName="updateUserName"
            @setError="newError => error = newError"
            @setInfo="newInfo => info = newInfo"
    ></router-view>
  </div>
  <message-modal
          :error="error"
          :info="info"
          @resetError="() => error = null"
          @resetInfo="() => info = null"
  ></message-modal>
</template>
<meta
        name='viewport'
        content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
/>
<script>
import HeaderBar from './components/HeaderBar.vue'
import MessageModal from './components/MessageModal.vue'

export default {
  name: 'App',
  components: {
    HeaderBar,
    MessageModal,
  },
  data() {
    return {
      userName: null,
      error: null,
      info: null,
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
