<template>
  <div class="home" :style="bgStyle">
    <!-- 通过 ref 属性为子组件赋予一个 ID 引用，用来直接从javascript访问这个组件 -->
    <Draggable
      class="container"
      ref="container"
      :style="gridStyle"
      ghost-class="ghost"
    >
      <TagItem
        v-for="tag in tags"
        :key="tag.id"
        class="item"
        :tag-prop="tag"
        @addClickTime="addClickTime(tag)"
      />
      <button class="btn" @click="createNewTag" :style="btnStyle">+</button>
    </Draggable>
    <v-dialog />
    <MyModal @close="closeMyModal"/>
    <div class="toolbox" @click="openToolbox"></div>
    <MyDrawer />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { debounce } from 'lodash'
import Draggable from 'vuedraggable'

import TagItem from '@/components/TagItem.vue'
import MyModal from '@/components/MyModal.vue'
import MyDrawer from '@/components/Drawer.vue'
import metascraper from '@/utils/metascraper.js'

export default {
  name: 'Home',
  provide () {
    return {
      home: this
    }
  },
  components: {
    TagItem,
    MyModal,
    Draggable,
    MyDrawer
  },
  data: function () {
    return {
      isAdd: true,
      containerWidth: 0,
      containerHeight: 0,
      exist: false
    }
  },
  mounted () {
    this.handleResize()
    window.addEventListener('resize', () => {
      this.handleResize()
    })
  },
  computed: {
    ...mapState({
      bgcolor: state => state.settings.bgcolor,
      columnNumber: state => state.settings.columnNumber,
      bgImage: state => state.settings.bgImage,
      activeTab: state => state.settings.activeTab,
      tags: state => state.settings.tags,
      activeTag: state => state.activeTag
    }),
    tagWidth () {
      return (this.containerWidth - (this.columnNumber - 1) * 20) / this.columnNumber
    },
    tagHeight () {
      return 0.75 * this.tagWidth
    },
    tagFontSize () {
      return this.tagHeight / 13
    },
    tagRowNumber () {
      return Math.floor(this.tags.length / this.columnNumber) + 2
    },
    gridStyle () {
      return {
        'grid-template-columns': `repeat(${this.columnNumber}, ${this.tagWidth}px)`,
        'grid-template-rows': `repeat(${this.tagRowNumber}, ${this.tagHeight}px)`
      }
    },
    fontStyle () {
      return {
        'font-size': `${this.tagFontSize}px`
      }
    },
    btnStyle () {
      return {
        'grid-row': `${Math.floor(this.tags.length / this.columnNumber) + 1}`,
        'grid-column': `${this.tags.length % this.columnNumber + 1}`
      }
    },
    bgStyle () {
      if (this.activeTab === 1) {
        return {
          'background-color': `${this.bgcolor}`
        }
      }
      return {
        backgroundImage: `${this.bgImage}`
      }
    }
  },
  methods: {
    ...mapActions([
      'updateTags'
    ]),
    // 新增tag的弹窗
    createNewTag () {
      this.isAdd = true
      this.$modal.show('myModal')
    },
    // 删除确认框
    showDelete (id) {
      this.$modal.show('dialog', {
        title: 'Confirm',
        text: 'Are you sure to delete this card?',
        buttons: [
          {
            title: 'Yes',
            handler: () => {
              const uid = (element) => element.id === id
              const index = this.tags.findIndex(uid)
              this.updateTags({
                type: 'delete',
                tag: {},
                index: index
              })
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
    // 防抖函数
    handleResize: debounce(function (e) {
      // $el用来获取当前组件(VUE实例)下的el，因为原生el被覆盖了
      // 先读取offsetWidth，再写入
      this.containerWidth = this.$refs.container.$el && this.$refs.container.$el.offsetWidth
      this.containerHeight = this.$refs.container.$el && this.$refs.container.$el.offsetHeight
    }, 200),
    fetchMetaData () {
      return metascraper(this.activeTag.url)
    },
    openToolbox () {
      this.exist = true
    },
    addClickTime (tag) {
      const uid = (element) => element.id === tag.id
      const index = this.tags.findIndex(uid)
      this.updateTags({
        type: 'addTimes',
        tag: tag,
        index: index
      })
      console.log(tag.clickTime)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
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
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.toolbox {
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    margin: 10px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, .33);
    padding: 4px;
    cursor: pointer;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: #f2f4f6;
    background-image: url("~@/assets/tool.svg");
    background-size: 16px;
    background-repeat: no-repeat;
    background-position: 50%;
}
</style>
