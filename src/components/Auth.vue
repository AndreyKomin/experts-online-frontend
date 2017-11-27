<template>
  <modal classnames="modal-auth" @close="$emit('close')">
    <h3 slot="header">Вход / Регистрация</h3>
    <div slot="body">

      <div class="row">
        <div class="col-6">
          <h4>Регистрация</h4>
          <div class="oauth">
            <button class="button oauth-button oauth-vk">
              <svg-icon iconId="vk"></svg-icon>
              <span>Вконтакте</span>
            </button>
            <button class="button oauth-button oauth-google">
              <svg-icon iconId="google"></svg-icon>
              <span>Google</span>
            </button>
            <button class="button oauth-button oauth-facebook">
              <svg-icon iconId="facebook"></svg-icon>
              <span>Facebook</span>
            </button>
          </div>

        </div>
        <div class="col-6">
          <h4>Вход</h4>
          <div class="oauth">
            <button class="button oauth-button oauth-vk">
              <svg-icon iconId="vk"></svg-icon>
              <span>Вконтакте</span>
            </button>
            <button class="button oauth-button oauth-google">
              <svg-icon iconId="google"></svg-icon>
              <span>Google</span>
            </button>
            <button class="button oauth-button oauth-facebook">
              <svg-icon iconId="facebook"></svg-icon>
              <span>Facebook</span>
            </button>
          </div>

          <form v-on:submit.prevent="sendLogin()">
            <div class="form-group">
              <label for="login">Логин:</label>
              <input type="text" id="login" name="login" class="form-control" v-model="login" />
            </div>
            <button class="btn btn-success" @click="sendLogin()">Войти</button>
          </form>
        </div>
      </div>

    </div>
    <div slot="footer">
      <button class="btn btn-dark btn-sm" @click="$emit('close')">
        Закрыть
      </button>
    </div>
  </modal>
</template>

<script>

  import { mapActions } from 'vuex';
  import Modal from '../components/Modal.vue';
  import svgIcon from 'components/base/SVG.vue'

  //  import Echo from 'laravel-echo';
//
//  const ws = new Echo({
//    broadcaster: 'socket.io',
//    host: 'https://ws.ekbrand.tk',
//  });

export default {
  name: 'auth', // required
  props: {
    show: Boolean
  },
  components: {
    Modal,
    svgIcon
  },
  data() {
    return {
      login: "",
      messenger_id: "1",
      showModal: this.show,
    };
  },
  created() {
//    ws.channel('user.1').on('App\\Events\\MessengerAuthEvent', (payload) => {
//      console.log(payload);
//    });
  },
  methods: {
    ...mapActions([
      'FETCH_AUTH'
    ]),
    sendLogin() {
      this.FETCH_AUTH({ login: this.login, messenger_id: this.messenger_id }).then(() => {
        this.$router.go(this.$router.currentRoute);
      }).catch();
    }
  }
//  props: ['item'],
  // http://ssr.vuejs.org/en/caching.html#component-level-caching
//  serverCacheKey: ({ item: { id, __lastUpdated, time }}) => {
//    return `${id}::${__lastUpdated}::${timeAgo(time)}`
//  }
}
</script>

<style lang="stylus" scoped>

  .oauth
    svg
      width: 20px
      height: 20px
      margin-right 10px
    span
      border-left solid 1px
      padding-left 10px
      display flex
      align-items center

    &-button
      cursor pointer
      background none
      display flex
      align-items stretch
      justify-content flex-start
      width 70%

    &-google
      background-color #f3543c
      border-color #d73823
      color white
      svg
        fill: white
      span
        border-left-color #d73823

    &-facebook
      background-color #3b5899
      border-color #3b5899
      color white
      svg
        fill: white
      span
        border-left-color #2d4a88

    &-vk
      background-color #44668d
      border-color #44668d
      color white
      svg
        fill: white



</style>
