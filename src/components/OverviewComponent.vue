<template>
  <div>
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

export default {
  name: 'OverviewComponent',
  components: {},
  props: {
  },
  data() {
    return {}
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

