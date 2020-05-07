<template>
  <div>
    <span>Search a picture:</span>
    <input v-model="inputValue"/>
    <button @click="getImage">Search</button>
    <ul class="select-pattern">
      <li
        v-for="picture in pictures"
        :key="picture.id"
        @click="selectPicture(picture)"
      >
      <img :src='picture.previewImage' :alt="picture.id">
      <figcaption>{{ picture.id }}</figcaption>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import getImageInfo from '@/utils/pixabay.js'

export default {
  name: 'ColorPicture',
  data () {
    return {
      inputValue: '',
      pictures: []
    }
  },
  methods: {
    ...mapActions([
      'updatePattern'
    ]),
    async getImage () {
      const res = await getImageInfo(this.inputValue)
      this.pictures = res.map(obj => {
        return {
          id: obj.id,
          previewImage: obj.previewURL,
          largeImage: obj.largeImageURL
        }
      })
    },
    selectPicture (picture) {
      this.updatePattern({
        bgImage: `url(${picture.largeImage})`
      })
    }
  }
}
</script>

<style lang="scss">

</style>
