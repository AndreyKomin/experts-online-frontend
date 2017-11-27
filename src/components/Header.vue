<template>
  <div class="root">

    <header class="header">
      <nav class="inner">
        <router-link class="menu-item" to="/"><span>Главная</span></router-link>
        <router-link class="menu-item" to="/registration"><span>Регистрация</span></router-link>
        <router-link class="menu-item" to="/roadmap"><span>RoadMap</span></router-link>
        <router-link class="menu-item" to="/contacts"><span>Контакты</span></router-link>
        <div class="flex1"></div>
        <ExpertsFilter v-if="$route.path === '/search'" />

        <div class="btn-group">
          <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Привет, {{ me.first_name }} {{ me.last_name }}
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <router-link class="dropdown-item" to="/profile">Профиль</router-link>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Выход</a>
          </div>
        </div>
        <span v-if="me.login"> </span>
      </nav>

    </header>

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import svgIcon from 'components/base/SVG.vue'

export default {
  name: 'site-header',
  components: {
    svgIcon
  },
  computed: mapGetters([
    'me'
  ]),
  mounted() {
    this.FETCH_ME()
  },
  methods: {
    ...mapActions([
       'FETCH_ME'
    ])
  }
}
</script>

<style lang="stylus" scoped>
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


  .menu-item
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


</style>
