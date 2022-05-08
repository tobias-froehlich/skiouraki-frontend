<template>
    <div class="form-modal">
        <div class="form-modal-container">
            <div class="form-modal-content container">
                <div class="row m-0">
                    <div class="form-group">
                        <input id="name" class="form-control" :class="{invalid: v$.name.$invalid}" type="text" v-model="name"/>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary" :disabled="v$.$invalid" @click.stop="addShoppingListItem">{{ $t('addItem') }}</button>
                        <button class="btn btn-primary" @click.stop="() => $emit('close')">{{ $t('cancel') }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import shoppingListApi from '../apis/shoppingListApi.js'


export default {
  name: 'FormAddShoppingListItem',
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
      name: null,
    }
  },
  validations: {
    name: {
      allowedLength(value) {
        return value && value.length <= shoppingListApi.maximalItemNameLength && value.length >= shoppingListApi.minimalItemNameLength
      },
    },
  },
  methods: {
    addShoppingListItem() {
      shoppingListApi.addShoppingListItem(this.enrichedShoppingList.id, this.name)
        .then(enrichedShoppingList => this.$emit('refresh', enrichedShoppingList))
        .then(() => this.$emit('close'))
    },
  },
}
</script>


<style lang="scss">


</style>