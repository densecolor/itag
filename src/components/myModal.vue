<template>
  <modal
    class="my-modal"
    name="myModal"
    transition="nice-modal-fade"
    height="auto"
    :delay="100"
    :draggable="true"
    @opened="opened"
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
      v-model="tag.url"
      @blur="urlBlur"
      @keyup.enter="urlBlur"
      required
    />
    <h3>Input Title</h3>
    <input v-model="tag.name" required/>
    <h3>Choose a logo</h3>
    <img class="tagImg" :src="tag.img" />
    <div class="two-button">
      <button class="cancelButton" @click="$emit('close')">Cancel</button>
      <button class="saveButton" v-if="home.isAdd" @click="addNewTag">Confirm</button>
      <button class="saveButton" v-else @click="modifyTag">Confirm</button>
    </div>
  </modal>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import uuid from 'js-shortid'
import { cloneDeep } from 'lodash'

export default {
  name: 'MyModal',
  inject: ['home'],
  data () {
    return {
      tag: {
        id: '',
        url: '',
        img: '',
        name: ''
      }
    }
  },
  computed: {
    ...mapState({
      activeTag: state => state.activeTag
    })
  },
  methods: {
    ...mapActions([
      'updateTags',
      'setActiveTag'
    ]),
    addNewTag () {
      this.tag.id = uuid.gen()
      this.updateTags({
        type: 'add',
        tag: this.tag,
        index: ''
      })
      this.home.closeMyModal()
    },
    async urlBlur () {
      const res = await this.home.fetchMetaData()
      this.tag.name = res.title
      this.tag.img = res.image
    },
    opened (event) {
      const t = cloneDeep(this.activeTag)
      this.tag = t
    },
    beforeClose (event) {
      this.setActiveTag()
    },
    modifyTag () {
      const tagIdd = (element) => element.id === this.tag.id
      const tagIndex = this.home.tags.findIndex(tagIdd)
      this.updateTags({
        type: 'modify',
        tag: this.tag,
        index: tagIndex
      })
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
