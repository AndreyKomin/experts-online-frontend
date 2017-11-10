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
  </div>

</template>

<script>

  import SearchForm from 'components/SearchForm.vue'

export default {
  name: 'home', // required
  data() {
    return {
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
