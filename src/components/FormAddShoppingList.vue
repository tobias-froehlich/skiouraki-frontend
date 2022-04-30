<template>
    <div>
        <div class="form-group">
            <label for="name">{{ $t('name') }}</label>
            <input id="name" class="form-control" :class="{invalid: v$.name.$invalid}" type="text" v-model="name"/>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" :disabled="v$.$invalid" @click.stop="addShoppingList">{{ $t('addShoppingList') }}</button>
        </div>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import shoppingListApi from '../apis/shoppingListApi.js'


export default {
  name: 'FormAddShoppingList',
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  components: {},
  data() {
    return {
      name: null,
    }
  },
  validations: {
    name: {
      allowedLength(value) {
        return value && value.length <= shoppingListApi.maximalNameLength && value.length >= shoppingListApi.minimalNameLength
      },
    },
  },
  methods: {
    addShoppingList() {
      shoppingListApi.addShoppingList(this.name)
        .then(() => this.$router.push({path: '/shopping-list-overview'}))
    },
  },
}
</script>

