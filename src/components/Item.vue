<template>
  <li class="search-item row">
    <div class="avatar col-3 col-md-2">
      <a href="#" @click.prevent="showUser(item.id)" class="item-link">
        <Avatar :src="item.avatar" :alt="`${item.first_name} ${item.last_name}`" />
      </a>
    </div>
    <div class="item-body col-9 col-md-10">
      <div class="title-group">
        <h3 class="title">
          <a href="#" @click.prevent="showUser(item.id)">
            {{ item.first_name }} {{ item.last_name }}
          </a>
          <svg-icon iconId="shield" v-if="item.isExpert" class="icon-shield" aria-label="Является Экспертом" />
        </h3>

        <div class="price text-right">
          <div class="price-flex" v-if="item.price > 0">
            <div class="amount">
              <strong>{{ item.price }}</strong>
            </div>
            <svg-icon iconId="ruble"></svg-icon>
            <div class="price-time">/ минута</div>
          </div>
        </div>
      </div>
      <div class="info">
        <div @click="showUser(item.id)" class="portfolio" :class="{ 'active' : mouseOver }">{{ item.portfolio }}</div>
        <div class="buttons text-right">
          <span class="buttons-title">Способы связи:</span>
          <div v-for="messenger in item.messengers" class="flex">
            <button class="button-icon" :class="messengerName = getMessengerNameById(messenger.messenger_id)">
              <svg-icon :iconId="'btn-' + messengerName"></svg-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>

import { RECOMMEND_TIME_MINUTES } from './../config'
import { timeAgo, getMessengerNameById } from '../util/filters'
import svgIcon from 'components/base/SVG.vue'
import Avatar from 'components/Avatar.vue'

export default {
  name: 'search-item',
  props: ['item'],
  // http://ssr.vuejs.org/en/caching.html#component-level-caching
  serverCacheKey: ({ item: { id, __lastUpdated, time }}) => {
    return `${id}::${__lastUpdated}::${timeAgo(time)}`
  },
  data () {
    return {
      consultRecommendTime: RECOMMEND_TIME_MINUTES,
      mouseOver: false,
    }
  },
  components: {
    svgIcon,
    Avatar,
  },
  methods: {
    ...{ getMessengerNameById },
    showUser(userId) {
      this.$emit('openUser', userId)
    }
  }
}
</script>

<style lang="stylus" scoped="">

  @import "../styles/variables.styl"

  search-item-max-height = 172px

  .search-item
    background-color #fff
    text-decoration none
    border-bottom 1px solid #eee
    position relative
    line-height 20px
    padding-top 15px
    padding-bottom 15px
    max-height search-item-max-height

    .meta, .host
      font-size .85em
      color #828282
      a
        color #828282
        text-decoration underline
        &:hover
          color #ff6600

  @import "../styles/user.styl"

</style>
