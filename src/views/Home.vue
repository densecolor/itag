<template>
  <div class="home">
    <div class="container" ref="container" :style="gridStyle">
      <tag
        v-for="(tag, index) in tags"
        :key="index"
        :tag="tag"
        class="item"
      />
      <v-dialog />
      <my-modal @close="closeMyModal"/>
      <button class="btn" @click="createNewTag">+</button>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
// @ is an alias to /src
import tag from '@/components/tag.vue'
import myModal from '@/components/myModal.vue'
import metascraper from '@/utils/metascraper.js'
export default {
  name: 'Home',
  provide () {
    return {
      home: this
    }
  },
  components: {
    tag,
    myModal
  },
  data: function () {
    return {
      tags: [
        // {
        //   id: 1,
        //   name: 'google',
        //   img: require('@/assets/google.svg'),
        //   url: 'http://www.google.com'
        // },
        // {
        //   id: 2,
        //   name: 'bing',
        //   img: require('@/assets/bing.svg'),
        //   url: 'http://www.bing.com'
        // }
      ],
      isAdd: true,
      url: '',
      containerWidth: 0,
      columnNumber: 4,
      gridStyle: {},
      fontStyle: {}
    }
  },
  mounted () {
    this.handleResize()
    window.addEventListener('resize', () => {
      this.handleResize()
    })
  },
  methods: {
    // 新增tag的弹窗
    createNewTag () {
      this.isAdd = true
      this.$modal.show('myModal')
    },
    // 删除确认框
    show (id) {
      this.$modal.show('dialog', {
        title: 'Confirm',
        text: 'Are you sure to delete this card?',
        buttons: [
          {
            title: 'Yes',
            handler: () => {
              const uid = (element) => element.id === id
              this.tags.splice(this.tags.findIndex(uid), 1)
              this.$modal.hide('dialog')
            }
          },
          {
            title: 'Cancel',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    closeMyModal: function () {
      this.$modal.hide('myModal')
    },
    handleResize: debounce(function (e) {
      this.containerWidth = this.$refs.container.offsetWidth
      const width = (this.containerWidth - (this.columnNumber - 1) * 20) / this.columnNumber
      const height = 0.75 * width
      const fontSize = height / 13
      this.gridStyle = {
        'grid-template-columns': `repeat(${this.columnNumber}, ${width}px)`,
        'grid-template-rows': `repeat(3, ${height}px)`
      }
      this.fontStyle = {
        'font-size': `${fontSize}px`
      }
    }, 200),
    fetchMetaData () {
      return metascraper(this.url)
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.container {
  display: grid;
  justify-content: center;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  width: 80%;
}
.btn {
  cursor: pointer;
}
.item {
  border-radius: 10px;
}
</style>
