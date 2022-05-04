<template>
    <div>
        <div class="container">
            {{ JSON.stringify(enrichedShoppingList) }}
        </div>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'


export default {
  name: 'ShoppingListItems',
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  components: {},
  props: {
    enrichedShoppingList: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
    }
  },
  validations: {
  },
  methods: {
  },
  created() {
  },
}
</script>

