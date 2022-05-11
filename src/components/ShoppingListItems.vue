<template>
    <div>
        <div class="container p-0">
            <div class="row row-list">
                <div class="col">
                    <button class="btn btn-primary btn-add" @click.stop="showFormAddShoppingListItem = true"><img src="../assets/img/plus.svg"></button>
                </div>
            </div>
            <div v-for="item of enrichedShoppingList.items" class="row row-list" :key="item.id">
                <div class="col-9">
                    <button class="btn btn-shopping-list-item">{{ item.name }}</button>
                </div>
                <div class="col col-3">
                    <button class="btn btn-primary btn-remove" @click.stop="() => removeShoppingListItem(item)"><img src="../assets/img/x.svg"></button>
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

