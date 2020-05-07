<template>
  <modal
    class="my-modal"
    name="myModal"
    transition="nice-modal-fade"
    height="auto"
    :delay="100"
    :draggable="true"
    @before-close="beforeClose">
    <div class="header">
      <a class="cancel" @click="home.closeMyModal()">
        <img src="@/assets/cancel.svg">
      </a>
      <h1 v-if="home.isAdd">Add new Tag</h1>
      <h1 v-else>Modify this tag</h1>
    </div>
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
    <img class="tagImg" :src="tag.img" />
    <div class="two-button">
      <button class="cancelButton" @click="$emit('close')">Cancel</button>
      <button
      class="saveButton"
      v-if="home.isAdd"
      @click="addNewTag"
      >Confirm</button>
      <button
      class="saveButton"
      v-else
      @click="modifyTag"
      >Confirm</button>
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
      this.home.closeMyModal()
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
      this.home.closeMyModal()
    }
  }
}
</script>

<style lang="scss">
.my-modal{
  position: relative;
  font-size: .8125rem;
  &.v--modal-overlay {
    z-index: 1001;
  }
  .v--modal-box.v--modal{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 2px;
  }
  .header {
    position: relative;
    h1 {
      text-align: center;
      border-bottom: 2px solid #d8dde6;
      padding: 1rem;
      font-weight: 300;
      font-size: 1.25rem;
    }
    .cancel {
      position: absolute;
      top: .5rem;
      right: .5rem;
      cursor: pointer;
      img {
        height: 2rem;
        width: 2rem;
    }
  }
  }
  .two-button {
    padding: .5rem 1rem;
    border-top: 2px solid #d8dde6;
    background-color: #f4f6f9;
    text-align: right;
    margin-top: 1em;
    button {
    border-radius: .25em;
    font-size: .75rem;
    line-height: 1.875rem;
    color: #0070d2;
    padding: 0 1em;
    cursor: pointer;
      &.cancelButton {
        border: 1px solid #d8dde6;
        &:hover {
          background-color: #f4f6f9;
          color: #005fb2;
        }
      }
      &.saveButton {
        margin-left: .5em;
        border: 1px solid #0070d2;
        background-color: #0070d2;
        color: #fff;
        &:hover {
          background-color: #005fb2;
        }
      }
    }
  }
  .tagImg {
    width: 25%;
    height: 25%;
    box-shadow: 0 0 2px;
  }
}
</style>
