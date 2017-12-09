<template>
  <li class="search-item row">
      <div class="avatar col-3">
        <a href="#" v-on:click.prevent="showUser()" class="item-link">
          <img :src="item.avatar" :alt="item.name">
        </a>
      </div>
      <div class="item-body col-9">
        <div class="title-group">
          <h3 class="title">
            <a href="#" v-on:click.prevent="showUser()">
              {{ item.first_name }} {{ item.last_name }}
            </a>
            <svg-icon iconId="shield" v-if="!item.isExpert" class="icon-shield" aria-label="Является Экспертом" />
          </h3>
          <div class="price">
            <strong>Консультация: от {{ item.price * 5 }} руб.</strong>
          </div>
        </div>
        <div class="info">
          <div class="portfolio">
            {{ item.portfolio }}
          </div>
        </div>
      </div>
      <span class="label" v-if="item.type !== 'story'">{{ item.type }}</span>
  </li>
</template>

<script>

import { mapActions } from 'vuex'
import { timeAgo } from '../util/filters'
import svgIcon from 'components/base/SVG.vue'

export default {
  name: 'search-item',
  props: ['item'],
  // http://ssr.vuejs.org/en/caching.html#component-level-caching
  serverCacheKey: ({ item: { id, __lastUpdated, time }}) => {
    return `${id}::${__lastUpdated}::${timeAgo(time)}`
  },
  components: {
    svgIcon
  },
  methods: {
    ...mapActions([
      'SHOW_USER',
    ]),
    showUser() {
      this.SHOW_USER(this.item.id);
    }
  }
}
</script>

<style lang="stylus" scoped="">

  @import "../styles/variables.styl"

  .avatar
    img
      width 100%
      height 100%

  .search-item
    background-color #fff
    text-decoration none
    border-bottom 1px solid #eee
    position relative
    line-height 20px
    padding-top 1px
    padding-bottom 1px
    +responsive(mobile)
      align-items center

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
    flex 1

    h3
      margin-top 0

  .item-link
    display block
    text-decoration none

  .title-group
    display flex
    justify-content space-between
    align-items center
    flex-wrap wrap
    margin-bottom 20px;
    margin-top 5px

    +responsive(mobile)
      margin-bottom 10px;

  .title
    display flex
    align-items center
    margin-right 60px;
    margin-bottom 0

    +responsive(mobile)
      font-size 16px
      margin-right 0

  .icon-shield
    width 30px
    height 30px
    margin-left 10px
    +responsive(mobile)
      width 18px
      height 18px
      margin-left 5px

  .info
    display flex
    justify-content space-between

  .portfolio
    flex 1
    white-space: pre-line;

  .price
    +responsive(mobile)
      font-size 12px


</style>
