<template>
  <div>
    <transition name="fade" mode="out-in">
      <div class="news-view">
        <div class="news-list-nav">
          <router-link v-if="page > 1" :to="{ path: 'search', query: { page: page - 1 }}">&lt; Назад</router-link>
          <a v-else class="disabled">&lt; Назад</a>
          <span>{{ page }}/{{ maxPage }}</span>
          <router-link v-if="hasMore" :to="{ path: 'search', query: { page: page + 1 }}">Вперед &gt;</router-link>
          <a v-else class="disabled">Вперед &gt;</a>
        </div>
        <transition :name="transition">
          <div class="news-list" :key="displayedPage" v-if="displayedPage > 0">
            <transition-group tag="ul" name="item">
              <item v-for="item in displayedItems" :key="item.id" :item="item">
              </item>
            </transition-group>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import Item from '../components/Item.vue'

export default {
  name: 'item-list',

  components: {
    Item
  },

  data () {
    return {
      transition: 'slide-right',
      displayedPage: Number(this.$route.query.page) || 1,
      displayedItems: this.$store.getters.activeItems
    }
  },

  computed: {
    page () {
      return Number(this.$route.query.page) || 1
    },
    maxPage () {
      const { itemsPerPage, users } = this.$store.state;
      return Math.ceil(users.length / itemsPerPage)
    },
    hasMore () {
      return this.page < this.maxPage
    }
  },

  beforeMount () {
      this.loadItems(this.page)
  },

  watch: {
    page (to, from) {
      this.loadItems(to, from)
    }
  },

  methods: {
    loadItems (to = this.page, from = -1) {
      this.$bar.start();
      this.$store.dispatch('FETCH_USERS').then(() => {
        if (this.page < 0 || this.page > this.maxPage) {
          this.$router.replace({ query: { page: 1 } });
          return
        }
        this.transition = from === -1
          ? null
          : to > from ? 'slide-left' : 'slide-right';
        this.displayedPage = to;
        this.displayedItems = this.$store.getters.activeItems;
        this.$bar.finish();
      })
    }
  }
}
</script>

<style lang="stylus">
.news-view
  padding-top 45px

.news-list-nav, .news-list
  background-color #fff
  border-radius 2px

.news-list-nav
  padding 15px 30px
  position fixed
  text-align center
  top 55px
  left 0
  right 0
  z-index 998
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  a
    margin 0 1em
  .disabled
    color #ccc

.news-list
  position absolute
  margin 30px 0
  width 100%
  transition all .5s cubic-bezier(.55,0,.1,1)
  ul
    list-style-type none
    padding 0
    margin 0

.slide-left-enter, .slide-right-leave-to
  opacity 0
  transform translate(30px, 0)

.slide-left-leave-to, .slide-right-enter
  opacity 0
  transform translate(-30px, 0)

.item-move, .item-enter-active, .item-leave-active
  transition all .5s cubic-bezier(.55,0,.1,1)

.item-enter
  opacity 0
  transform translate(30px, 0)

.item-leave-active
  position absolute
  opacity 0
  transform translate(30px, 0)

@media (max-width 600px)
  .news-list
    margin 10px 0
</style>