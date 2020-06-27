<template>
  <section>
    <aside class="drawer" :style="drawerStyle">
      <div class="drawer_body">
        <div class="drawer_header">
          <h1 class="drawer_header_title">Custom</h1>
          <a class="drawer_header_close" @click="closeToolbox">
            <img src="@/assets/cancel.svg">
          </a>
        </div>
        <div class="drawer_body_item">
          <label class="drawer_body_item_label">Column number: <span>{{ value }}</span></label>
          <vue-slider
            v-model="value"
            :min="4"
            :max="12"
            :lazy="true"
            :contained="true"
            @change="updateColumnNumber"
          ></vue-slider>
        </div>
        <div class="drawer_body_item">
          <label class="drawer_body_item_label">Background:</label>
          <button class="background_icon" @click="showBg"></button>
        </div>
        <div class="drawer_body_item">
          <label class="drawer_body_item_label">Statistic:</label>
          <button class="statistic_icon" @click="showChart"></button>
        </div>
        <div class="drawer_body_item">
          <label class="drawer_body_item_google">Async your data :</label>
          <button class="google_icon" @click="handleSignInClick"></button>
          <label class="drawer_body_item_google">Sign out :</label>
          <button class="google_icon" @click="handleSignOutClick"></button>
        </div>
      </div>
      <div class="drawer_footer"></div>
    </aside>
    <div class="overlay" ref="overlay" :style="overlayStyle" @click="closeToolbox"></div>
    <modal
      class="bg-modal my-modal"
      name="bgModal"
      transition="nice-modal-fade"
      height="auto"
      :delay="100">
      <div class="header">
        <a class="cancel" @click="closeBgModal">
          <img src="@/assets/cancel.svg">
        </a>
        <h1>Change Background</h1>
      </div>
      <nav>
        <ul class="modal-tab">
          <li
            v-for="item in items"
            class="modal-tab__item"
            :key="item.id"
            :class="{ active: item.id === activeTab }"
            @click="selectTab(item)"
          >
          {{ item.name }}
          </li>
        </ul>
      </nav>
      <keep-alive>
        <component :is="currentTabComponent" class="tab"></component>
      </keep-alive>
      <div class="two-button">
        <button class="cancelButton" @click="closeBgModal">Cancel</button>
        <button class="saveButton">Save</button>
      </div>
    </modal>
    <modal
      class="chart-modal my-modal"
      name="chartModal"
      transition="nice-modal-fade"
      height="auto"
      :delay="100">
      <div class="header">
        <a class="cancel" @click="closeBgModal">
          <img src="@/assets/cancel.svg">
        </a>
        <h1>Statistic Chart</h1>
      </div>
      <ve-pie-chart
        :data="chartData"
        :settings="chartSettings"
      />
    </modal>
  </section>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
import { mapState, mapActions } from 'vuex'

import ColorPick from '@/components/ColorPick.vue'
import ColorPattern from '@/components/ColorPattern.vue'
import ColorPicture from '@/components/ColorPicture.vue'

export default {
  name: 'Drawer',
  inject: ['home'],
  components: {
    VueSlider,
    ColorPick,
    ColorPattern,
    ColorPicture
  },
  computed: {
    ...mapState({
      tags: state => state.settings.tags
    }),
    drawerStyle: function () {
      if (this.home.exist === true) {
        return 'transform:translate3d(0,0,0);right:0;transition-duration: .3s;'
      }
      return 'transform:translate3d(300px,0,0);right:0;transition-duration: .3s;'
    },
    overlayStyle: function () {
      if (this.home.exist === true) {
        return {
          opacity: '0.5',
          'z-index': '999'
        }
      }
      return {
        opacity: '0',
        'z-index': '-999'
      }
    },
    currentTabComponent: function () {
      const res = this.items.filter(element => element.id === this.activeTab)
      return res[0].component
    }
  },
  data () {
    return {
      value: 6,
      activeTab: 1,
      items: [
        {
          id: 1,
          name: 'Pure',
          component: ColorPick
        },
        {
          id: 2,
          name: 'Pattern',
          component: ColorPattern
        },
        {
          id: 3,
          name: 'Picture',
          component: ColorPicture
        }
      ],
      chartSettings: {
        roseType: 'area',
        radius: [30, 110]
      },
      chartData: {},
      website: [],
      clickTimes: []
    }
  },
  mounted () {
    this.handleClientLoad()
  },
  methods: {
    ...mapActions([
      'updateColumn',
      'updateActiveTab'
    ]),
    closeToolbox () {
      this.home.exist = false
    },
    showBg () {
      this.$modal.show('bgModal')
      this.home.exist = false
    },
    closeBgModal () {
      this.$modal.hide('bgModal')
      this.$modal.hide('chartModal')
    },
    selectTab (item) {
      this.activeTab = item.id
      this.updateActiveTab(this.activeTab)
    },
    updateColumnNumber () {
      this.updateColumn(this.value)
    },
    showChart () {
      this.$modal.show('chartModal')
      this.website = this.tags.map(obj => {
        return obj.name
      })
      this.clickTimes = this.tags.map(obj => {
        return obj.clickTime
      })
      this.chartData = {
        dimensions: {
          name: 'website',
          data: this.website
        },
        measures: [{
          name: 'clickTime',
          data: this.clickTimes
        }]
      }
    },
    initClient () {
      const API_KEY = 'AIzaSyCeUNfKsZYbRD2ML2sjbmiK3abw2T-OzYU'
      const CLIENT_ID = '557562562449-nhg2llks2cer1gde12gl5u2nefijpiut.apps.googleusercontent.com'
      const SCOPE = 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets'
      const that = this
      this.$gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPE,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4']
      }).then(function () {
        // Listen for sign-in state changes.
        that.$gapi.auth2.getAuthInstance().isSignedIn.listen(that.updateSignInStatus)
        // Handle the initial sign-in state.
        that.updateSignInStatus(that.$gapi.auth2.getAuthInstance().isSignedIn.get())
      })
    },
    // Load the API client and auth2 library
    handleClientLoad () {
      this.$gapi.load('client:auth2', this.initClient)
    },
    handleSignInClick (event) {
      this.$gapi.auth2.getAuthInstance().signIn()
    },
    handleSignOutClick (event) {
      this.$gapi.auth2.getAuthInstance().signOut()
    },
    updateSignInStatus (isSignedIn) {
      console.log(isSignedIn)
      if (isSignedIn) {
        this.makeApiCall()
      }
    },
    // Load the API and make an API call.  Display the results on the screen.
    makeApiCall () {
      var spreadsheetBody = {
      }

      var request = this.$gapi.client.sheets.spreadsheets.create({}, spreadsheetBody)
      request.then(function (response) {
        console.log(response.result)
      }, function (reason) {
        console.error('error: ' + reason.result.error.message)
      })
    }
  }
}
</script>

<style lang="scss">
div.overlay{
  position:fixed;
  z-index: -999;
  left: 0px;
  top:0px;
  background:rgba(11, 10, 12, 0.35);
  opacity: 1;
  width: 100%;
  height: 100%;
}
aside.drawer{
  z-index: 1000;
  position: fixed;
  will-change: transform;
  height: 100vh;
  top: 0px;
  /* transition:transform 0.3s ease; */
  background-color:#222;
  width: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  // word-wrap: break-word;
  color: #ccc;
}
.drawer_body {
  display: flex;
  flex-direction: column;
  margin: 20px;
}
.drawer_body_item {
  display:flex;
  flex-direction: column;
  margin-bottom: 20px;
  .background_icon {
    height: 40px;
    width: 40px;
    background-color: #ccc;
    cursor: pointer;
    outline: none;
  }
  .google_icon {
    height: 40px;
    width: 40px;
    background-color: rgb(143, 229, 169);
    cursor: pointer;
    outline: none;
  }
  .statistic_icon {
    height: 40px;
    width: 40px;
    background-image: url("~@/assets/chart.svg");
    background-size: 40px;
    background-repeat: no-repeat;
    background-position: 50%;
    background-color: #222;
    border: 0;
    cursor: pointer;
    outline: none;
  }
}
.drawer_body_item_label {
  padding: 5px;
}
.drawer_header_title {
  font-size: 1.3em;
  margin: 0;
  padding: 5px;
  border: none;
  text-align: center;
  font-weight: 400;
}
.drawer_header_close {
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
  img {
    height: 40px;
    width: 40px;
    padding: 7px;
  }
}
.bg-modal {
  h3 {
    text-align: center;
  }
  nav {
    display: block;
    margin-left: 10px;
    .modal-tab {
      list-style: none;
      padding: 0px;
      margin-block-start: 1em;
      margin-block-end: 1em;
      &__item {
        display: inline-block;
        text-decoration: none;
        padding: 5px;
        margin: 5px;
        text-transform: uppercase;
        cursor: pointer;
        &:hover {
          background: #404D5B;
          color: #F9F7F6;
        }
        &.active {
          border: 2px solid #222;
        }
      }
    }
  }
}
.cornerBuntton {
  position: relative;
  border-radius: .25rem;
  right: 0;
  top: 0;
}
</style>
