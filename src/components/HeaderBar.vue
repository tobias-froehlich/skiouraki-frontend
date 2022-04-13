<template>
    <div>
        <drop-down
                class="drop-down-locale"
                :options="dropDownLocaleOptions"
        >
          {{ getLocaleText($i18n.locale) }}
        </drop-down>
        <drop-down
                class="drop-down-user"
                v-if="userName"
                :options="dropDownUserOptions">
            {{ userName }}
        </drop-down>
        <router-link class="router-link-log-in" v-else to="/login">{{ $t('logIn') }}</router-link>

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
        {label: this.getLocaleText('en-US'), action: () => this.$i18n.locale = 'en-US'},
        {label: this.getLocaleText('de-DE'), action: () => this.$i18n.locale = 'de-DE'},
      ],
      dropDownUserOptions: [
        {label: 'log out', action: this.logOut},
        {label: 'do nothing', action: () => null},
      ],
    }
  },
  methods: {
    getLocaleText(locale) {
        if (locale === 'en-US') {
            return 'EN'
        } else if (locale === 'de-DE') {
            return 'DE'
        }
        return null
    },
    logOut() {
      userApi.logOut()
      this.$emit('updateUserName', null)
    },
  }
}
</script>