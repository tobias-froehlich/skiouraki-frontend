<template>
    <div class="drop-down">
        <button :class="{'drop-down-button': true, 'pressed': expanded}" @click.stop="() => expanded = !expanded"><slot/></button>
        <div class="div-drop-down" v-if="expanded">
            <button class="button-drop-down" v-for="(option, idx) of options" @click.stop="() => doActionOfOption(option)" :key="idx">
                {{ option.label }}
            </button>
        </div>
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
  },
}
</script>
<style lang="css">

div.drop-down {
  display: inline;
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