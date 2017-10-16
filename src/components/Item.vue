<template>
  <li class="search-item">
    <span class="image">
      <img :src="item.picture.medium" :alt="item.name">
    </span>
    <div class="item-body">
      <h3 class="title">
        <a :href="item.url" >{{ item.name }}</a>
      </h3>
    </div>

    <span class="label" v-if="item.type !== 'story'">{{ item.type }}</span>
  </li>
</template>

<script>
import { timeAgo } from '../util/filters'

export default {
  name: 'search-item',
  props: ['item'],
  // http://ssr.vuejs.org/en/caching.html#component-level-caching
  serverCacheKey: ({ item: { id, __lastUpdated, time }}) => {
    return `${id}::${__lastUpdated}::${timeAgo(time)}`
  }
}
</script>

<style lang="stylus">
.search-item
  background-color #fff
  padding 15px 30px
  border-bottom 1px solid #eee
  position relative
  line-height 20px
  display flex
  align-items flex-start

  .image
    margin-right 10px;
    height 72px
    width 72px

  .meta, .host
    font-size .85em
    color #828282
    a
      color #828282
      text-decoration underline
      &:hover
        color #ff6600

.item-body
  display flex
  flex-direction column

  h3
    margin-top 0

</style>
