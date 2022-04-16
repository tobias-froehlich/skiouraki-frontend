<template>
    <div class="error-modal" v-if="error || info">
        <div class="error-modal-container">
            <div v-if="error" class="error-modal-content container">
                <div class="row m-0 alert alert-warning">
                    {{ $t(error) }}
                </div>
                <div class="row m-0">
                    <button class="btn btn-warning" @click.stop="$emit('resetError')">{{ $t('ok') }}</button>
                </div>
            </div>
            <div v-else-if="info" class="error-modal-content container">
                <div class="row m-0 alert alert-info">
                    {{ $t(info) }}
                </div>
                <div class="row m-0">
                    <button class="btn btn-info" @click.stop="$emit('resetInfo')">{{ $t('ok') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'MessageModal',
  components: {
  },
  props: {
    error: {
      type: String,
      required: false,
    },
    info: {
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