<template>
  <div class="tag" draggable="true">
    <a class="hello"
      :href="tag.adrs"
      target="_blank"
      :style="imgStyle">
      <!-- <img :src="tag.img" class="tag-img"> -->
      <div class="tag-name">
        {{ tag.name }}
      </div>
    </a>
    <a class="delete" @click="deleteTag">
      <img src="@/assets/delete.svg">
    </a>
    <a class="modify" @click="modifyTag">
      <img src="@/assets/edit.svg">
    </a>
  </div>

</template>

<script>
export default {
  name: 'tag',
  inject: ['home'],
  props: {
    tag: Object
  },
  data () {
    return {
      imgStyle: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      const res = await this.home.fetchMetaData()
      this.imgStyle = {
        'background-image': `url(${res.image})`,
        'background-size': 'cover',
        'background-repeat': 'no-repeat',
        'background-position': '50%',
        height: '100%',
        width: '100%'
      }
      console.log(this.imgStyle)
    },
    deleteTag () {
      this.home.show(this.tag.id)
    },
    modifyTag () {
      this.home.isAdd = false
      this.home.$modal.show('myModal')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
  text-decoration: none;
}
.tag {
  display: flex;
  position: relative;
  &:hover {
    .delete {
      display: block;
    }
    .modify {
      display: block;
    }
  }
  .delete {
    display: none;
    position: absolute;
    right: 0;
    top: 0;
    padding: 5px;
    cursor: pointer;
    img {
      height: 19px;
      width: 20px;
      &:hover {
        animation-name: buzz;
        animation-duration: 0.15s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
      @keyframes buzz {
        50% {
          transform: translateX(3px) rotate(2deg);
        }
        100% {
          transform: translateX(-3px) rotate(-2deg);
        }
      }
    }
  }
  .modify {
    display: none;
    position: absolute;
    right: 20px;
    top: 0px;
    padding: 5px;
    cursor: pointer;
    img {
      height: 20px;
      width: 20px;
      &:hover {
        animation-name: bounce;
        animation-duration: 0.8s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: 1;
      }
      @keyframes bounce {
        16.65% {
          transform: translateY(4px);
        }

        33.3% {
          transform: translateY(-3px);
        }

        49.95% {
          transform: translateY(3px);
        }

        66.6% {
          transform: translateY(-2px);
        }

        83.25% {
          transform: translateY(1px);
        }

        100% {
          transform: translateY(0);
        }
      }
    }
  }
  .tag-name {
    color: #000000;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    margin-bottom: 12px;
    text-align: center;
  }
}
</style>
