<template>
  <div>
    <p>{{ $t('hello')}}, {{ userName }}!</p>
  </div>
</template>

<script>
import userApi from '../apis/userApi.js'

export default {
  name: 'OverviewComponent',
  components: {},
  props: {
  },
  data() {
    return {
      userName: userApi.getUserName(),
    }
  },
  methods: {
  },
}
</script>

