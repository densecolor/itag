<template>
  <div class="tag" draggable="true">
    <a class="tag__link"
      :href="tagProp.url"
      target="_blank"
      :style="imgStyle"
      @click="$emit('addClickTime')">
      <div class="tag__link--name" :style="this.home.fontStyle">
        {{ tagProp.name }}
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
import { mapState, mapActions } from 'vuex'
import { cloneDeep } from 'lodash'

export default {
  name: 'TagItem',
  inject: ['home'],
  props: {
    tagProp: Object
  },
  data () {
    return {
      activeTag: {}
    }
  },
  computed: {
    ...mapState({
      tags: state => state.settings.tags
      // activeTag: state => state.activeTag
    }),
    imgStyle () {
      return {
        'background-image': `url(${this.tagProp.img})`
      }
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'updateTags',
      'setActiveTag'
    ]),
    deleteTag () {
      this.home.showDelete(this.tagProp.id)
    },
    modifyTag () {
      this.home.isAdd = false
      this.$modal.show('myModal')
      const tagIdd = (element) => element.id === this.tagProp.id
      // 使用深拷贝解决对象引用问题
      const tags = cloneDeep(this.tags)
      const tagIndex = tags.findIndex(tagIdd)
      this.activeTag = tags[tagIndex]
      this.setActiveTag(this.activeTag)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tag {
  display: flex;
  position: relative;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .33);
  padding-bottom: 25px;
  background-color: #FFF;
  &__link {
    text-decoration: none;
    border-radius: 10px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50%;
    height: 100%;
    width: 100%;
    &--name {
      color: #000000;
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: 100%;
      margin-bottom: 4px;
      text-align: center;
    }
  }
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .33);
    cursor: pointer;
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
}
</style>
