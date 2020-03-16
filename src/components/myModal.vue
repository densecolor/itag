<template>
  <modal
    class="my-modal"
    name="myModal"
    transition="nice-modal-fade"
    :min-width="200"
    :min-height="500"
    :height="500"
    :delay="100"
    :draggable="true"
    @before-close="beforeClose">
    <h1 v-if="home.isAdd">Add new Tag</h1>
    <h1 v-else>Modify this tag</h1>
    <h3>Input URL</h3>
    <input
      v-model="urlinput"
      @blur="urlBlur"
      @keyup.enter="urlBlur"
      required
    />
    <h3>Input Title</h3>
    <input v-model="titleinput" required/>
    <h3>Choose a logo</h3>
    <img :src="tag.img" />
    <div class="two-button">
      <button @click="$emit('close')">Cancel</button>
      <button v-if="home.isAdd"
      @click="addNewTag">Confirm</button>
      <button v-else
      @click="modifyTag">Confirm</button>
    </div>
  </modal>
</template>
<script>
import uuid from 'js-shortid'

export default {
  name: 'MyModal',
  inject: ['home'],
  data () {
    return {
      urlinput: '',
      titleinput: '',
      tag: {
        name: '',
        img: '',
        url: ''
      }
    }
  },
  watch: {
    'home.isAdd': {
      handler (newVal) {
        if (!newVal) {
          this.tag = this.home.activeTag
          this.urlinput = this.home.activeTag.url
          this.titleinput = this.home.activeTag.name
        }
      }
    }
  },
  mounted () {
  },
  methods: {
    // beforeOpen (event) {
    //   this.tag = this.home.activeTag
    //   this.urlinput = this.home.activeTag.url
    //   this.titleinput = this.home.activeTag.name
    // },
    addNewTag () {
      this.tag.id = uuid.gen()
      this.tag.url = this.urlinput
      this.tag.name = this.titleinput
      this.home.tags.push(this.tag)
      this.home.$modal.hide('myModal')
    },
    async urlBlur () {
      this.home.url = this.urlinput
      const res = await this.home.fetchMetaData()
      this.tag.name = res.title
      this.tag.url = this.urlinput
      this.tag.img = res.image

      this.titleinput = this.tag.name
    },
    beforeClose (event) {
      this.urlinput = ''
      this.titleinput = ''
      this.tag = {
        name: '',
        img: '',
        url: ''
      }
    },
    // http://www.yuque.com
    modifyTag () {
      const tagIdd = (element) => element.id === this.home.activeTag.id
      const tagIndex = this.home.tags.findIndex(tagIdd)
      this.home.tags.splice(tagIndex, 1, this.tag)
      this.home.$modal.hide('myModal')
    }
  }
}
</script>

<style lang="less">
.my-modal {
  .v--modal-box.v--modal{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 2px;
  }
  .two-button {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  img {
    width: 25%;
    height: 25%;
    box-shadow: 0 0 2px;
  }
}
</style>
