<template>
  <div>
    <div class="container">
      <div style="" class="row">
        <div class="col p-0">
          <button class="btn btn-primary btn-fill-col" @click.stop="gotoShoppingListOverview">
            {{ $t('myShoppingLists') }}
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col p-0">
          <button class="btn btn-primary btn-fill-col" @click.stop="gotoInvitations">
            {{ $t('myInvitations') }}
          </button>
        </div>
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

