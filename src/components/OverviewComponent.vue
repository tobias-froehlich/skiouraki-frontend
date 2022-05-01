<template>
  <div>
    <p>{{ $t('hello')}}, {{ userName }}!</p>
    <div class="container">
      <div class="row">
        <button class="btn btn-primary" @click.stop="gotoShoppingListOverview">
          {{ $t('myShoppingLists') }}
        </button>
      </div>
      <div class="row">
        <button class="btn btn-primary" @click.stop="gotoInvitations">
          {{ $t('myInvitations') }}
        </button>
      </div>
    </div>
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
    gotoInvitations() {
      this.$router.push({path: '/invitation-overview'})
    }
  },
}
</script>

