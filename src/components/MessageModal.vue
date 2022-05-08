<template>
    <div class="message-modal" v-if="error || info">
        <div class="message-modal-container">
            <div v-if="error" class="message-modal-content container error">
                <div class="row m-0">
                    {{ $t(error) }}
                </div>
                <div class="row m-0">
                    <button class="btn btn-message-error btn-with-content-above" @click.stop="$emit('resetError')">{{ $t('ok') }}</button>
                </div>
            </div>
            <div v-else-if="info" class="message-modal-content container">
                <div class="row m-0">
                    {{ $t(info) }}
                </div>
                <div class="row m-0">
                    <button class="btn btn-message-info btn-with-content-above" @click.stop="$emit('resetInfo')">{{ $t('ok') }}</button>
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

</style>