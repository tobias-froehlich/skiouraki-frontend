<template>
    <div>
        <div class="row m-0 p-0">
            <div class="col p-0">
                <router-link class="btn btn-secondary float-left btn-icon" :to="userName ? '/overview' : '/'"><img src="../assets/img/home.svg"></router-link>
            </div>
            <div class="col p-0">
                <drop-down
                        class="d-inline float-end"
                        clazz="d-inline float-end btn btn-secondary btn-icon btn-header"
                        v-if="userName"
                        :options="dropDownUserOptions">
                    <img src="../assets/img/squirrel.svg">
                </drop-down>
                <router-link class="btn btn-secondary d-inline float-end btn-header" v-else to="/login">{{ $t('logIn') }}</router-link>
                <drop-down
                        class="d-inline float-end"
                        clazz="btn btn-secondary btn-header"
                        :options="dropDownLocaleOptions"
                >
                    {{ $t($i18n.locale) }}
                </drop-down>
            </div>
        </div>
    </div>
</template>

<script>
import userApi from '../apis/userApi.js'
import DropDown from './DropDown.vue'

export default {
  name: 'HeaderBar',
  components: {
    DropDown,
  },
  props: {
    userName: {
      type: String,
      required: false,
    },
  },
  validations: {},
  computed: {},
  data() {
    return {
      dropDownLocaleOptions: [
        {label: 'en-US', action: () => this.$i18n.locale = 'en-US'},
        {label: 'de-DE', action: () => this.$i18n.locale = 'de-DE'},
      ],
      dropDownUserOptions: [
        {label: 'logOut', action: this.logOut},
        {label: 'changeUserName', action: this.changeUserName},
        {label: 'changePassword', action: this.changePassword},
        {label: 'deleteAccount', action: this.deleteUser},
      ],
      visible: false,
    }
  },
  methods: {
    logOut() {
      userApi.logOut()
      this.$emit('updateUserName', null)
      this.$router.push({path: '/login'})
    },
    changeUserName() {
      this.$router.push({path: '/change-user-name'})
    },
    changePassword() {
      this.$router.push({path: '/change-password'})
    },
    deleteUser() {
      this.$router.push({path: '/delete-user'})
    }
  }
}
</script>