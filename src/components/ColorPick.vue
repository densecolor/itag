<template>
  <div>
    <slider-picker class="colorPicker" v-model="colors" @input="updateColorValue"/>
  </div>
</template>

<script>
import { Slider } from 'vue-color'
import { mapActions } from 'vuex'

export default {
  name: 'ColorPick',
  components: {
    'slider-picker': Slider
  },
  data () {
    return {
      colors: '#fff'
    }
  },
  methods: {
    ...mapActions([
      'updateColor'
    ]),
    updateColorValue () {
      this.updateColor(this.colors.hex)
    }
  }
}
</script>

<style lang="scss">
.colorPicker {
  margin: 50px 0px 50px 100px;
}
</style>
