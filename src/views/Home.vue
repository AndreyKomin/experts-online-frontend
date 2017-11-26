<template>

  <div class="banner">
    <h1 class="heading">Найди своего эксперта с нами!</h1>

    <h3 class="desc">Популярные запросы:</h3>
    <div class="buttons">
      <router-link class="button" v-for="button in buttons" :key="button.id" :to="{ path: 'search', query: { tags: button.tag }}">{{button.name}}</router-link>
    </div>
    <div>
      <SearchForm />
    </div>

    <form v-on:submit.prevent="sendLogin()">
      <label for="login">Username</label>
      <input type="text" id="login" name="login" class="form-control" v-model="login" />
      <button class="button" @click="sendLogin()">Login</button>
    </form>
  </div>

</template>

<script>

  import SearchForm from 'components/SearchForm.vue';
//  import Echo from 'laravel-echo';
//
//  const ws = new Echo({
//    broadcaster: 'socket.io',
//    host: 'https://ws.ekbrand.tk',
//  });

  export default {
  name: 'home', // required
  data() {
    return {
      login: "",
      messenger_id: "1",
      buttons: [
        {
          id: 3,
          name: '#Топ-менеджмент',
          tag: "top-management"
        },
        {
          id: 2,
          name: '#Bitcoin',
          tag: "bitcoin"
        },
        {
          id: 4,
          name: '#Yandex.Direct',
          tag: "direct"
        },
        {
          id: 4,
          name: '#Директ',
          tag: "direct"
        },
      ]
    }
  },
  components: {
    SearchForm
  },
  created() {
//    ws.channel('user.1').on('App\\Events\\MessengerAuthEvent', (payload) => {
//      console.log(payload);
//    });
  },
  methods: {
    sendLogin() {
      this.$store.dispatch('FETCH_AUTH', { login: this.login, messenger_id: this.messenger_id }).then(() => {
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
  .banner
    display flex
    justify-content center
    text-align center
    flex-wrap wrap
  .heading
    height 200px
    display flex
    align-items center
  .button
    width auto
  .buttons
    width 100%
    display flex
    justify-content center


  .desc
    margin-bottom 10px
    width 100%


</style>
