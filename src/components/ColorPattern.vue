<template>
  <div>
    <ul class="select-pattern">
      <li
        v-for="colorModel in colorModels"
        :key="colorModel.id"
        @click="selectColorPattern(colorModel)"
      >
      <img :src='colorModel.image' :alt="colorModel.alt">
      <figcaption>{{ colorModel.alt }}</figcaption>
      </li>
    </ul>
    <div class="sliderStyle">
      <span>Variance</span>
      <vue-slider
        v-model="valueVariance"
        :min="0"
        :max="1"
        :interval="0.05"
        :lazy="true"
        :contained="true"
        @change="getTrianglifyMethod"
      ></vue-slider>
      <span>Cell Size</span>
      <vue-slider
        v-model="valueCell"
        :min="0"
        :max="100"
        :interval="5"
        :lazy="true"
        :contained="true"
        @change="getTrianglifyMethod"
      ></vue-slider>
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import { mapActions } from 'vuex'
import image1 from '@/assets/blue.png'
import image2 from '@/assets/orange.png'
import image3 from '@/assets/purple.png'
import image4 from '@/assets/red.png'
import image5 from '@/assets/yellow.png'
import image6 from '@/assets/pink.png'

import getTrianglify from '@/utils/trianglify.js'

export default {
  name: 'ColorPattern',
  components: {
    VueSlider
  },
  data () {
    return {
      valueVariance: 0.75,
      valueCell: 65,
      reqColor: '',
      patternResult: '',
      colorModels: [
        {
          id: 1,
          name: 'YlGnBu',
          image: image1,
          alt: 'Blue'
        },
        {
          id: 2,
          name: 'YlOrRd',
          image: image2,
          alt: 'Orange'
        },
        {
          id: 3,
          name: 'PuOr',
          image: image3,
          alt: 'Purple'
        },
        {
          id: 4,
          name: 'Reds',
          image: image4,
          alt: 'Red'
        },
        {
          id: 5,
          name: 'Spectral',
          image: image5,
          alt: 'Yellow'
        },
        {
          id: 6,
          name: 'PuRd',
          image: image6,
          alt: 'Pink'
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'updatePattern'
    ]),
    selectColorPattern (colorModel) {
      this.reqColor = colorModel.name
      this.getTrianglifyMethod()
    },
    getTrianglifyMethod () {
      this.patternResult = getTrianglify(this.reqColor, this.valueVariance, this.valueCell)
      this.updatePattern({
        bgImage: this.patternResult
      })
    }
  }
}
</script>

<style lang="scss">
ul.select-pattern {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 30px;
  list-style: none;
  padding: 0px;
  li {
    text-align: center;
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    &:hover {
      box-shadow: 0px 2px 4px rgba(32, 32, 32, 0.33);
      cursor: pointer;
    }
  }
}
.sliderStyle {
  margin: 3rem 4rem 1rem 3rem;
  display: grid;
  grid-template-columns: 1fr 6fr;
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 10px;
}
</style>
