<template>
  <div>
    <div class="banner">
      <h1 class="heading">RoadMap!</h1>
    </div>
    <ul>
      <li>31 Декабря 2017 года - Запуск!</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'roadmap', // required
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
    height 200px

  .heading
    display flex
    align-items center
  .button
    cursor pointer
    background-color #5682a3
    border 1px solid white
    border-radius 3px
    padding 5px
    display flex
    align-items center
    color white
    font-weight 500


</style>
