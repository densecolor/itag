<template>
  <div class="color-picture">
    <div class="color-picture__search">
      <span>Search a picture:</span>
      <input v-model="inputValue"/>
      <button @click="getImage">Search</button>
    </div>
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
    <pagination
      class="color-picture__page"
      :records="total"
      :per-page="perPage"
      :page="1"
      v-model="pageNumber"
      :options="{ texts: { count: '{count} records' }}"
      @paginate="changePage"
    >
    </pagination>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Pagination from 'vue-pagination-2'
import getImageInfo from '@/utils/pixabay.js'

export default {
  name: 'ColorPicture',
  components: {
    Pagination
  },
  data () {
    return {
      inputValue: '',
      pictures: [
        {
          id: 2695569,
          largeImage: 'https://pixabay.com/get/54e6dc464f54a514f6da8c7dda793678163adee356506c48702772d5974bc15db9_1280.jpg',
          previewImage: 'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_150.jpg'
        },
        {
          id: 1867616,
          largeImage: 'https://pixabay.com/get/57e8d3444c53aa14f6da8c7dda793678163adee356506c48702772d5974bc15db9_1280.jpg',
          previewImage: 'https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_150.jpg'
        },
        {
          id: 1072366,
          largeImage: 'https://pixabay.com/get/57e0d2414954aa14f6da8c7dda793678163adee356506c48702772d5974bc15db9_1280.jpg',
          previewImage: 'https://cdn.pixabay.com/photo/2015/12/01/15/43/black-1072366_150.jpg'
        },
        {
          id: 1074131,
          largeImage: 'https://pixabay.com/get/57e0d2474b51ad14f6da8c7dda793678163adee356506c48702772d5974bc15db9_1280.jpg',
          previewImage: 'https://cdn.pixabay.com/photo/2015/12/03/08/50/paper-1074131_150.jpg'
        },
        {
          id: 736885,
          largeImage: 'https://pixabay.com/get/51e3d34b4257b108f5d084609629317d103fd8e0524c704c7d267ad49149c059_1280.jpg',
          previewImage: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_150.jpg'
        },
        {
          id: 2468874,
          largeImage: 'https://pixabay.com/get/54e4d34b4255a814f6da8c7dda793678163adee356506c48702772d5974bc15db9_1280.jpg',
          previewImage: 'https://cdn.pixabay.com/photo/2017/07/03/20/17/abstract-2468874_150.jpg'
        }
      ],
      perPage: 6,
      total: 0,
      pageNumber: 1
    }
  },
  methods: {
    ...mapActions([
      'updatePattern'
    ]),
    async getImage () {
      const res = await getImageInfo(this.inputValue, this.pageNumber)
      this.total = res.total
      this.pictures = res.hits.map(obj => {
        return {
          id: obj.id,
          previewImage: obj.previewURL,
          largeImage: obj.largeImageURL
        }
      })
      console.log(res)
    },
    selectPicture (picture) {
      this.updatePattern(`url(${picture.largeImage})`)
    },
    changePage (pageNumber) {
      pageNumber = this.pageNumber
      this.getImage()
    }
  }
}
</script>

<style lang="scss">
.color-picture__search {
  padding: 5px 100px;
}
.color-picture__page {
  .active {
    z-index: 3;
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
  }
  ul {
    list-style: none;
  }
  p {
    margin-left: 530px;
    margin-right: 10px;
  }
  li {
    padding: 0;
    margin: 0;
    a {
      position: relative;
      border: 1px solid #ddd;
      float: left;
      color: #337ab7;
      margin: -1px;
      line-height: 1.42857143;
      padding: 6px 12px;
      text-decoration: none;
      &:hover {
        z-index: 2;
        color: #23527c;
        background-color: #eee;
        border-color: #ddd;
      }
    }
  }
}
</style>
