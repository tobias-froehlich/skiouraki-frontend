<template>
    <div>
        <div class="row m-0 p-0">
            <div class="col p-0">
                <router-link class="btn btn-primary d-inline float-left" to="/">{{ $t('skiouraki') }}</router-link>
            </div>
            <div class="col p-0">
                <drop-down
                        class="d-inline float-end"
                        :options="dropDownLocaleOptions"
                >
                    {{ $t($i18n.locale) }}
                </drop-down>
                <drop-down
                        class="d-inline float-end"
                        v-if="userName"
                        :options="dropDownUserOptions">
                    {{ userName }}
                </drop-down>
                <router-link class="btn btn-primary d-inline float-end" v-else to="/login">{{ $t('logIn') }}</router-link>
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