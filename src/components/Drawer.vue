<template>
<section>
  <aside class="sidebar" :style="sidebarStyle" ref="element">
    <button @click="closeToolbox">close</button>
  </aside>
  <div class="overlay" ref="overlay" :style="overlayStyle"></div>
</section>
</template>

<script>
export default {
  name: 'Drawer',
  inject: ['home'],
  computed: {
    sidebarStyle: function () {
      if (this.home.exist === true) {
        return 'transform:translate3d(0,0,0);right:0;transition-duration: .3s;'
      }
      return 'transform:translate3d(300px,0,0);right:0;transition-duration: .3s;'
    },
    overlayStyle: function () {
      if (this.home.exist === true) {
        return {
          opacity: '1',
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
    }
  },
  methods: {
    closeToolbox () {
      this.home.exist = false
    }
  }
}
</script>

<style scoped>
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
aside.sidebar{
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
</style>
