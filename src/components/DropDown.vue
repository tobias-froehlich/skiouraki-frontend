<template>
    <div class="drop-down"
    >
        <button ref="theButton" :class="clazz + ' drop-down-button'"
                @click.stop="() => expanded = !expanded"
                @blur="looseFocus"
        >
            <slot/>
            <div v-if="expanded">
                <button :id="`button-${idx}`" class="btn btn-secondary" v-for="(option, idx) of options" @click.stop="() => doActionOfOption(option)" :key="idx">
                    {{ $t(option.label) }}
                </button>
            </div>
        </button>

    </div>
</template>

<script>

export default {
  name: 'DropDown',
  components: {},
  props: {
    options: {
      type: Array,
      required: true,
    },
    clazz: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      expanded: false,
    }
  },
  methods: {
    doActionOfOption(option) {
      this.expanded = false
      option.action()
    },
    looseFocus() {
      setTimeout(() => this.expanded = false, 200)
    }
  },
}
</script>
<style lang="scss">

button.drop-down-button {
  position: relative;
}

button.drop-down-button > div {
  display: none;
  position: absolute;
  right: 0px;
  z-index: 1;
  white-space: nowrap;
}

button.drop-down-button:hover > div {
  display: block;
}

button.drop-down-button > div > button {
  display: block;
  width: 100%;
  text-align: left;
}

</style>