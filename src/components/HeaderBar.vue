<template>
    <div>
        <div class="row">
            <div class="col">
                <router-link class="btn btn-primary" to="/">Home</router-link>

            </div>
            <div class="col">
                <drop-down
                        class="drop-down-locale"
                        :options="dropDownLocaleOptions"
                >
                    {{ $t($i18n.locale) }}
                </drop-down>
            </div>
            <div class="col">
                <drop-down
                        class="drop-down-user"
                        v-if="userName"
                        :options="dropDownUserOptions">
                    {{ userName }}
                </drop-down>
                <router-link class="btn btn-primary router-link-log-in" v-else to="/login">{{ $t('logIn') }}</router-link>

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
        {label: 'doNothing', action: () => null},
      ],
      visible: false,
    }
  },
  methods: {
    logOut() {
      userApi.logOut()
      this.$emit('updateUserName', null)
    },
    click1() {
      this.visible = true
    },
    click2() {
      alert('hello')
    },
  }
}
</script>