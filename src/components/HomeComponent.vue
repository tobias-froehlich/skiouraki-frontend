<template>
  <div>
    {{ $t('helloWorld') }}
    <router-link to="/signup">{{ $t('signUp') }}</router-link>
    <button @click="() => error = 'something went wrong'">open modal</button>
    <error-modal
      :error="error"
      @resetError="() => error = null"
    ></error-modal>
  </div>
</template>

<script>
import ErrorModal from './ErrorModal.vue'

export default {
  name: 'HomeComponent',
  components: {
    ErrorModal,
  },
  props: {},
  data() {
    return {
      user: null,
      error: null,
    }
  },
  methods: {
  },
}
</script>

