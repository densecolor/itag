<template>
  <div class="home">
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
        :tag-prop="tag"
        @getTagId="getActiveTag"
        class="item"
      />
    <button class="btn" @click="createNewTag" :style="btnStyle">+</button>
    </Draggable>
    <v-dialog />
    <MyModal @close="closeMyModal"/>
    <a class="toolbox" @click="openToolbox">
      <img src="@/assets/tool.svg">
    </a>
    <MyDrawer />
  </div>
</template>

<script>
import { debounce, cloneDeep } from 'lodash'
import TagItem from '@/components/TagItem.vue'
import MyModal from '@/components/MyModal.vue'
import MyDrawer from '@/components/Drawer.vue'
import metascraper from '@/utils/metascraper.js'
import Draggable from 'vuedraggable'
// import VueSlider from 'vue-slider-component'
// import 'vue-slider-component/theme/antd.css'

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
    // VueSlider
  },
  data: function () {
    return {
      tags: [
        {
          id: '2bQo1FJOZSU',
          img: 'https://gw.alipayobjects.com/zos/rmsportal/xwaMkpycAdwCBrdgyWiT.png',
          name: '语雀',
          url: 'http://www.yuque.com'
        },
        {
          id: '2bQo1FJOZSP',
          img: 'https://pic4.zhimg.com/80/v2-a47051e92cf74930bedd7469978e6c08_hd.png',
          name: '知乎',
          url: 'http://www.zhihu.com'
        },
        {
          id: '2bQo1FJOZSQ',
          img: 'https://pic4.zhimg.com/80/v2-a47051e92cf74930bedd7469978e6c08_hd.png',
          name: 'github',
          url: 'http:/ /www.zhihu.com'
        },
        {
          id: '2bQo1FJOZSR',
          img: 'https://pic4.zhimg.com/80/v2-a47051e92cf74930bedd7469978e6c08_hd.png',
          name: 'youtube',
          url: 'http://www.zhihu.com'
        },
        {
          id: '2bQo1FJOZSA',
          img: 'https://pic4.zhimg.com/80/v2-a47051e92cf74930bedd7469978e6c08_hd.png',
          name: '知乎',
          url: 'http://www.zhihu.com'
        },
        {
          id: '2bQo1FJOZSB',
          img: 'https://pic4.zhimg.com/80/v2-a47051e92cf74930bedd7469978e6c08_hd.png',
          name: 'github',
          url: 'http:/ /www.zhihu.com'
        },
        {
          id: '2bQo1FJOZSC',
          img: 'https://pic4.zhimg.com/80/v2-a47051e92cf74930bedd7469978e6c08_hd.png',
          name: 'youtube',
          url: 'http://www.zhihu.com'
        }
      ],
      isAdd: true,
      url: '',
      containerWidth: 0,
      columnNumber: 4,
      gridStyle: {},
      fontStyle: {},
      activeTag: {},
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
    btnStyle () {
      return {
        'grid-row': `${Math.floor(this.tags.length / this.columnNumber) + 1}`,
        'grid-column': `${this.tags.length % this.columnNumber + 1}`
      }
    }
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
      // $el用来获取当前组件(VUE实例)下的el，因为原生el被覆盖了
      this.containerWidth = this.$refs.container.$el && this.$refs.container.$el.offsetWidth
      const width = (this.containerWidth - (this.columnNumber - 1) * 20) / this.columnNumber
      const height = 0.75 * width
      const fontSize = height / 13
      const rowNumber = Math.floor(this.tags.length / this.columnNumber) + 2
      this.gridStyle = {
        'grid-template-columns': `repeat(${this.columnNumber}, ${width}px)`,
        'grid-template-rows': `repeat(${rowNumber}, ${height}px)`
      }
      this.fontStyle = {
        'font-size': `${fontSize}px`
      }
      console.log(this.gridStyle)
    }, 200),
    fetchMetaData () {
      return metascraper(this.url)
    },
    getActiveTag (tagId) {
      this.isAdd = false
      this.$modal.show('myModal')
      const tagIdd = (element) => element.id === tagId
      // 使用深拷贝解决对象引用问题
      const tags = cloneDeep(this.tags)
      const tagIndex = tags.findIndex(tagIdd)
      this.activeTag = tags[tagIndex]
    },
    openToolbox () {
      this.exist = true
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
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.toolbox {
    position: absolute;
    right: 0;
    top: 0;
    margin: 10px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, .33);
    padding: 4px;
    cursor: pointer;
    img {
      height: 20px;
      width: 20px;
    }
}
</style>
