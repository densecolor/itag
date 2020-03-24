<template>
<section>
  <aside class="drawer" :style="drawerStyle">
    <div class="drawer_header">
      <h1 class="drawer_header_title">Custom</h1>
      <a class="drawer_header_close" @click="closeToolbox">
        <img src="@/assets/cancel.svg">
      </a>
    </div>
    <div class="drawer_body">
      <div class="drawer_body_item1">
        <label class="drawer_body_item1_label">Column number: </label>
        <span>{{ value }}</span>
        <vue-slider
          v-model="value"
          :min="4"
          :max="12"
          :lazy="true"
          :contained="true"
        ></vue-slider>
      </div>
    </div>
    <div class="drawer_footer"></div>
  </aside>
  <div class="overlay" ref="overlay" :style="overlayStyle" @click="closeToolbox"></div>
</section>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
  name: 'Drawer',
  inject: ['home'],
  components: {
    VueSlider
  },
  computed: {
    drawerStyle: function () {
      if (this.home.exist === true) {
        return 'transform:translate3d(0,0,0);right:0;transition-duration: .3s;'
      }
      return 'transform:translate3d(300px,0,0);right:0;transition-duration: .3s;'
    },
    overlayStyle: function () {
      if (this.home.exist === true) {
        return {
          opacity: '0.5',
          'z-index': '999'
        }
      }
      return {
        opacity: '0',
        'z-index': '-999'
      }
    }
  },
  data () {
    return {
      value: 6
    }
  },
  watch: {
    value: function (newQuestion, oldQuestion) {
      this.home.columnNumber = this.value
    }
  },
  methods: {
    closeToolbox () {
      this.home.exist = false
    }
  }
}
</script>

<style scoped lang="less">
div.overlay{
  position:fixed;
  z-index: -999;
  left: 0px;
  top:0px;
  background:rgba(11, 10, 12, 0.35);
  opacity: 1;
  width: 100%;
  height: 100%;
}
aside.drawer{
  z-index: 9999;
  position: fixed;
  will-change: transform;
  height: 100%;
  top: 0px;
  /* transition:transform 0.3s ease; */
  background:#fff;
  width: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  word-wrap: break-word;
}
.drawer_header_title {
    font-size: 1.3em;
    margin: 0;
    padding: 5px;
    border: none;
    text-align: center;
    font-weight: 400;
}
.drawer_header_close {
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
    img {
      height: 20px;
      width: 20px;
      padding: 7px;
    }
}
</style>
