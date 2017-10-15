<template>
  <li class="news-item">
    <span class="image">
      <img :src="item.picture.medium" :alt="item.name">
    </span>
    <span class="title">
      {{ item.name }}
      <template v-if="item.url">
        <a :href="item.url" target="_blank" rel="noopener">{{ item.title }}</a>
        <span class="host"> ({{ item.url | host }})</span>
      </template>
      <template v-else>
        <router-link :to="'/item/' + item.id">{{ item.title }}</router-link>
      </template>
    </span>
    <br>
    <span class="meta">
      <span v-if="item.type !== 'job'" class="by">
        by <router-link :to="'/user/' + item.by">{{ item.by }}</router-link>
      </span>
      <span class="time">
        {{ item.time | timeAgo }} ago
      </span>
      <span v-if="item.type !== 'job'" class="comments-link">
        | <router-link :to="'/item/' + item.id">{{ item.descendants }} comments</router-link>
      </span>
    </span>
    <span class="label" v-if="item.type !== 'story'">{{ item.type }}</span>
  </li>
</template>

<script>
import { timeAgo } from '../util/filters'

export default {
  name: 'news-item',
  props: ['item'],
  // http://ssr.vuejs.org/en/caching.html#component-level-caching
  serverCacheKey: ({ item: { id, __lastUpdated, time }}) => {
    return `${id}::${__lastUpdated}::${timeAgo(time)}`
  }
}
</script>

<style lang="stylus">
.news-item
  background-color #fff
  padding 15px 30px
  border-bottom 1px solid #eee
  position relative
  line-height 20px
  display flex
  align-items flex-start

  .image
    margin-right 10px;
  .meta, .host
    font-size .85em
    color #828282
    a
      color #828282
      text-decoration underline
      &:hover
        color #ff6600
</style>
