<template>
  <div>
    <p>{{ $t('hello')}}, {{ userName }}!</p>
    <button class="btn btn-primary" @click.stop="gotoShoppingListOverview">
      {{ $t('myShoppingLists') }}
    </button>
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
    gotoShoppingListOverview() {
      this.$router.push({path: '/shopping-list-overview'})
    },
  },
}
</script>

