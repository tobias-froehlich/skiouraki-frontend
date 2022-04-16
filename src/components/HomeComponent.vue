<template>
  <div>
    <router-link class="btn btn-secondary" to="/signup">{{ $t('signUp') }}</router-link>
  </div>
</template>

<script>

export default {
  name: 'HomeComponent',
  components: {},
  props: {},
  data() {
    return {
      user: null,
    }
  },
  methods: {
  },
}
</script>

