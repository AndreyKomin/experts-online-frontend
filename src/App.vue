<template>
  <div id="app">
    <SVGSprite />

    <SiteHeader />

    <router-view class="view"></router-view>

  </div>
</template>

<script>

  import { mapActions } from 'vuex'
  import SVGSprite from './components/base/SVGSprite.vue'
  import ExpertsFilter from './components/ExpertsFilter.vue'
  import SiteHeader from './components/Header.vue'

  export default {
    name: 'app',
    components: {
      SVGSprite,
      ExpertsFilter,
      SiteHeader
    },
    methods: mapActions([
      'FETCH_TOKEN'
    ]),
    mounted() {
      this.FETCH_TOKEN();
    }
  }
</script>

<style lang="stylus">

  @import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
  @import "styles/main.styl"

body
  font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size 15px
  background-color lighten(#eceef1, 30%)
  margin 0
  padding-top 55px
  color #34495e
  overflow-y scroll

a
  color #0088cc
  text-decoration none



.view
  max-width 800px
  margin 0 auto
  position relative

.fade-enter-active, .fade-leave-active
  transition all .2s ease

.fade-enter, .fade-leave-active
  opacity 0

@media (max-width 860px)
  .header .inner
    padding 15px 30px

@media (max-width 600px)
  .header
    .inner
      padding 15px
    a
      margin-right 1em
    .github
      display none
</style>
