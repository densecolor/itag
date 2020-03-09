<template>
  <modal
      class="my-modal"
      name="myModal"
      transition="nice-modal-fade"
      :min-width="200"
      :min-height="500"
      :height="500"
      :delay="100"
      :draggable="true">
    <h1>Add new Tag</h1>
    <h3>Input URL</h3>
    <input v-model="urlinput" required/>
    <h3>Input Title</h3>
    <input v-model="titleinput" required/>
    <h3>Add a logo</h3>
    <input/>
    <div class="two-button">
      <button @click="$emit('close')">Cancel</button>
      <button @click="AddNewTag">Yes</button>
    </div>
  </modal>
</template>
<script>
export default {
  name: 'myModal',
  inject: ['home'],
  data () {
    return {
      urlinput: '',
      titleinput: '',
      tag: {
        id: Number,
        name: String,
        img: String,
        adrs: String
      }
    }
  },
  methods: {
    AddNewTag () {
      this.tag.adrs = this.urlinput
      this.tag.name = this.titleinput
      this.home.tags.push(this.tag)
      this.home.$modal.hide('myModal')
      this.urlinput = ''
      this.titleinput = ''
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
}
</style>
