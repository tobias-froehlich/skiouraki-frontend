<template>
    <div>
        <div class="container">
            <button @click.stop="showFormAddShoppingListItem = true">{{ $t('addItem') }}</button>
            <div v-for="item of enrichedShoppingList.items" class="row" :key="item.id">
                <div class="col-10">
                    <span class="shopping-list-item">{{ item.name }}</span>
                </div>
                <div class="col-1">
                    <button @click.stop="() => removeShoppingListItem(item)">x</button>
                </div>
            </div>
        </div>
        <form-add-shopping-list-item
                v-if="showFormAddShoppingListItem"
                :enrichedShoppingList="enrichedShoppingList"
                @close="showFormAddShoppingListItem = false"
                @refresh="enrichedShoppingList => $emit('refresh', enrichedShoppingList)"
        >
        </form-add-shopping-list-item>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import shoppingListApi from '../apis/shoppingListApi.js'
import FormAddShoppingListItem from './FormAddShoppingListItem.vue'

export default {
  name: 'ShoppingListItems',
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  components: {
    FormAddShoppingListItem,
  },
  props: {
    enrichedShoppingList: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showFormAddShoppingListItem: false,
    }
  },
  validations: {
  },
  methods: {
    removeShoppingListItem(item) {
        shoppingListApi.removeShoppingListItem(this.enrichedShoppingList.id, item)
          .then(enrichedShoppingList => this.$emit('refresh', enrichedShoppingList))
    }
  },
  created() {
  },
}
</script>

