<template>
  <div>
    {{ $t('helloWorld') }}
    <router-link to="/signup">{{ $t('signUp') }}</router-link>
  </div>
</template>

<script>


export default {
  name: 'HomeComponent',
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

