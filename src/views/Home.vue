<template>

  <div class="banner">
    <h1 class="heading">Получи консультацию от эксперта по своему проекту</h1>

    <h3 class="desc">Разделы:</h3>
    <div class="links">
      <router-link class="btn btn-primary btn-lg" to="/experts"><span>Эксперты</span></router-link>
      <router-link class="btn btn-primary btn-lg" to="/users"><span>Пользователи</span></router-link>
      <router-link class="btn btn-primary btn-lg" to="/contacts"><span>Информация</span></router-link>
    </div>
  </div>

</template>

<script>

  import { mapActions } from 'vuex';
  import SearchForm from 'components/SearchForm.vue';
//  import Echo from 'laravel-echo';
//
//  const ws = new Echo({
//    broadcaster: 'socket.io',
//    host: 'https://ws.ekbrand.tk',
//  });

  export default {
  name: 'home', // required
  components: {
    SearchForm
  },
  created() {
//    ws.channel('user.1').on('App\\Events\\MessengerAuthEvent', (payload) => {
//      console.log(payload);
//    });
  },

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

  .links
    width 100%
    display flex
    flex-wrap wrap
    justify-content center

    .btn
      width 180px
      height 180px
      margin 10px
      max-width none
      align-items center
      display flex
      justify-content center

  .desc
    margin-bottom 10px
    width 100%


</style>
