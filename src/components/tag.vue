<template>
  <div class="tag" draggable="true">
    <a class="hello" :href="tag.adrs" target="_blank">
      <figure class="tag-img">
        <img :src="tag.img" >
      </figure>
    <div class="tag-name">
      {{ tag.name }}
    </div>
    </a>
    <a class="delete" @click="deleteTag">
      <img src="@/assets/delete.svg">
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
    }
  },
  methods: {
    deleteTag () {
      this.home.show(this.tag.id)
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
  flex-direction: column;
  justify-content: space-around;
  height: 150px;
  position: relative;
  &:hover {
    .delete {
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
      height: 20px;
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
  .tag-img {
    img {
      height: 80px;
      width: 180px;
    }
  }
  .tag-name {
    color: #000000;
  }
}
</style>
