<template>
  <div class="home">
      <div class="container">
        <tag
          v-for="tag in tags"
          :key="tag.id"
          :tag="tag"
          class="item"
        >
        </tag>
        <v-dialog/>
        <my-modal @close="closeMyModal"/>
        <button
          class="btn"
          @click="createNewTag"
          >+</button>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import tag from '@/components/tag.vue'
import myModal from '@/components/myModal.vue'

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
        {
          id: 1,
          name: 'google',
          img: require('@/assets/google.svg'),
          adrs: 'http://www.google.com'
        },
        {
          id: 2,
          name: 'bing',
          img: require('@/assets/bing.svg'),
          adrs: 'http://www.bing.com'
        }
      ]
    }
  },
  methods: {
    // 新增tag的弹窗
    createNewTag () {
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
    closeMyModal () {
      this.$modal.hide('myModal')
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  display: grid;
  grid-template-columns: repeat(6, 250px);
  grid-template-rows: repeat(100, 150px);
  justify-content: center;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
}
.btn {
  border: 1px solid blue;
  padding: 30px 0px;
  cursor: pointer;
}
.item {
  border: 1px solid blue;
}
</style>
