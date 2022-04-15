<template>
    <div class="drop-down"
    >
        <button ref="theButton" class="drop-down-button"
        >
            <slot/>
            <div class="div-drop-down">
                <button :id="`button-${idx}`" class="button-drop-down" v-for="(option, idx) of options" @click.stop="() => doActionOfOption(option)" :key="idx">
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
    }
  },
  data() {
    return {
      expanded: false,
      focussed1: false,
      focussed2: false,
    }
  },
  methods: {
    doActionOfOption(option) {
      this.expanded = false
      option.action()
    },
    onLooseFocus() {
        this.$nextTick(() => this.expanded = false)
    },
  },
}
</script>
<style lang="css">

div.drop-down {
  display: inline;
}

button.drop-down-button > div.div-drop-down {
  display: none;
}

button.drop-down-button:hover > div.div-drop-down {
  display: block;
}

div.div-drop-down {
  position: absolute;

}

button.button-drop-down {
  background-color: yellow;
  display: block;
  width: 100%;
  text-align: left;
}

</style>