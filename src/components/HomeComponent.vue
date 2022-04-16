<template>
  <div>
    {{ $t('helloWorld') }}
    <router-link to="/signup">{{ $t('signUp') }}</router-link>
    <button @click="() => error = 'something went wrong'">open modal</button>
    <Message-modal
      :error="error"
      @resetError="() => error = null"
    ></Message-modal>
  </div>
</template>

<script>
import MessageModal from './MessageModal.vue'

export default {
  name: 'HomeComponent',
  components: {
    MessageModal,
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

