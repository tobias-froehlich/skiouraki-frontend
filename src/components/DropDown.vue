<template>
    <div class="drop-down"
    >
        <button ref="theButton" class="drop-down-button"
                @click.stop="() => expanded = !expanded"
                @blur="looseFocus"
        >
            <slot/>
            <div class="div-drop-down" v-if="expanded">
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