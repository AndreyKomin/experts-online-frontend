<template>
  <div id="app">
    <SVGSprite />

    <header class="header">
      <nav class="inner">
        <router-link to="/"><span>Главная</span></router-link>
        <router-link to="/registration"><span>Регистрация</span></router-link>
        <router-link to="/roadmap"><span>RoadMap</span></router-link>
        <router-link to="/contacts"><span>Контакты</span></router-link>
        <div class="flex1"></div>
        <ExpertsFilter v-if="$route.path === '/search'" />
      </nav>
    </header>
    <router-view class="view"></router-view>

  </div>
</template>

<script>

  import SVGSprite from './components/base/SVGSprite.vue'
  import ExpertsFilter from './components/ExpertsFilter.vue'

  export default {
    name: 'app',
    components: {
      SVGSprite,
      ExpertsFilter
    },
  }
</script>

<style lang="stylus">
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

.header
  background-color #5682a3
  position fixed
  z-index 999
  height 55px
  top 0
  left 0
  right 0

  .inner
    max-width 800px
    box-sizing border-box
    margin 0 auto
    padding 0 5px
    display flex
    justify-content flex-start
    position relative
    align-items center
    height 100%


  a
    color rgba(255, 255, 255, .8)
    line-height 24px
    transition color .15s ease
    display inline-block
    vertical-align middle
    font-weight 300
    letter-spacing .075em
    margin-right 1.8em
    &:hover
      color #fff
    &.router-link-active
      color #fff
      font-weight 400
    &:nth-child(6)
      margin-right 0
  .github
    color #fff
    font-size .9em
    margin 0
    float right

.flex1
  flex 1

.logo
  width 24px
  margin-right 10px
  display inline-block
  vertical-align middle

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
