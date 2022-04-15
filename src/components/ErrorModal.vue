<template>
    <div class="error-modal" v-if="error">
        <div class="error-modal-container">
            <div class="error-modal-content container">
                <div class="row m-0 alert alert-warning">
                    {{ error }}
                </div>
                <div class="row m-0">
                    <button class="btn btn-warning" @click.stop="$emit('resetError')">{{ $t('ok') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'ErrorModal',
  components: {
  },
  props: {
    error: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
    }
  },
  methods: {
  },
}
</script>

<style lang="scss">
.error-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.error-modal-container {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

</style>