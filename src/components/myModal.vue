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
    <h1 v-if="this.home.isAdd">Add new Tag</h1>
    <h1 v-else>Modify this tag</h1>
    <h3>Input URL</h3>
    <input v-model="urlinput" required/>
    <h3>Input Title</h3>
    <input v-model="titleinput" required/>
    <h3>Choose a logo</h3>
    <!-- <img :src="this.home.metascraper(this.urlinput).image"> -->
    <div class="two-button">
      <button @click="$emit('close')">Cancel</button>
      <button @click="AddNewTag">Confirm</button>
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
  mounted () {
  },
  methods: {
    AddNewTag () {
      this.home.url = this.urlinput
      this.tag.adrs = this.urlinput
      // this.tag.name = this.home.metascraper(this.urlinput).title
      // this.tag.img = this.home.metascraper(this.urlinput).image
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
