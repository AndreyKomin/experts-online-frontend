<template>
  <div class="root">

    <header class="header">
      <div class="container">
        <nav class="inner">
          <router-link class="logo" to="/">
            <svg-icon iconId="mortarboard" class="icon"></svg-icon>
            <div class="text">
              <h1 class="title">Эксперты онлайн</h1>
              <span class="subtitle">Консультации от профессионалов</span>
            </div>
          </router-link>
          <div class="nav-container" :class="{ 'open': mobileMenu }">
            <router-link class="menu-item" to="/experts"><span>Эксперты</span></router-link>
            <router-link class="menu-item" to="/users"><span>Пользователи</span></router-link>
            <a href="#" v-if="!me.login" @click="showAuth = true" class="menu-item"><span>Вступить в сообщество</span></a>
            <router-link class="menu-item" to="/contacts"><span>Информация</span></router-link>
            <div class="flex1"></div>
            <!--<ExpertsFilter v-if="$route.path === '/search'" />-->

            <div class="btn-group" v-if="me.login">
              <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Привет, {{ me.first_name }}
              </button>
              <div class="dropdown-menu dropdown-menu-right">
                <router-link class="dropdown-item" to="/profile">Профиль</router-link>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item" @click="logout()" href="#">Выход</button>
              </div>
            </div>

            <button v-if="!me.login" @click="showAuth = true" class="btn btn-primary">
              Вход
            </button>
          </div>
          <button class="btn btn-primary btn-mobile-menu" @click="mobileMenu = !mobileMenu">Меню</button>
        </nav>

        <AuthModal
            v-if="showAuth"
            @close="showAuth = false"
        ></AuthModal>
      </div>
    </header>

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import svgIcon from 'components/base/SVG.vue'
  import AuthModal from 'components/AuthModal.vue'

  export default {
  name: 'site-header',
  components: {
    svgIcon,
    AuthModal
  },
  data() {
    return {
      showAuth: false,
      mobileMenu: false
    };
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
    ]),
    logout() {
      localStorage.clear();
      window.location.replace('/')
    }
  }
}
</script>

<style lang="stylus" scoped>

  @import '../styles/variables.styl'

  .logo
    iconSize = 50px

    display flex
    align-items center
    color white
    text-decoration none
    margin-right 60px

    .text
      display flex
      flex-direction column

    .title
      font-size 16px
      white-space nowrap
      margin-bottom 0
      line-height 1
    .subtitle
      font-size 11px
      white-space nowrap


    .icon
      width iconSize
      height iconSize
      fill white
      margin-right 7px

  .header
    background-color main-color
    position fixed
    z-index 999
    height header-height
    top 0
    left 0
    right 0

    .container
      height: 100%;

    .inner
      max-width main-width
      box-sizing border-box
      margin 0 auto
      display flex
      justify-content space-between
      position relative
      align-items center
      height 100%

    .nav-container
      display flex
      justify-content flex-start
      position relative
      align-items center
      height 100%
      flex 1

      +responsive(mobile tablet)
        display none
        position absolute
        top header-height
        left 0
        width: 100%;
        background-color main-color
        flex-direction column
        padding 20px
        height auto
        border-top 1px solid white

        .menu-item
          width 100%
          margin-right 0
          padding 5px 10px

        &.open
          display block

  .btn-mobile-menu
    display none
    margin-right 20px
    +responsive(mobile tablet)
      display block

  .menu-item
    color rgba(255, 255, 255, .8)
    line-height 24px
    transition color .15s ease
    display inline-block
    vertical-align middle
    font-weight 400
    margin-right 1.4em

    &:hover
      color #fff
    &.router-link-active
      color #fff
      text-decoration underline
    &:nth-child(6)
      margin-right 0
    .github
      color #fff
      font-size .9em
      margin 0
      float right

  .flex1
    flex 1


</style>
