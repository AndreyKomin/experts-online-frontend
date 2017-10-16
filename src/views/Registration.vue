<template>

  <div class="banner">
    <h1 class="heading">Регистрация проходит внутри мессенджера! Добавь нашего бота себе в контакты и следуй инструкциям</h1>
    <a href="https://t.me/helperbusiness_bot">@helperbusiness_bot</a>
  </div>

</template>

<script>

export default {
  name: 'registration', // required
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
    flex-direction column
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
  a
    font-size 24px
    font-weight bold

</style>
