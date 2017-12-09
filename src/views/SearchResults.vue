<template>
  <div>
    <transition name="fade" mode="out-in">
      <div class="news-view">
        <div class="news-list-nav">
          <router-link v-if="page > 1" :to="{ query: { page: page - 1 }}">&lt; Назад</router-link>
          <a v-else class="disabled">&lt; Назад</a>
          <span>{{ page }}/{{ maxPage }}</span>
          <router-link v-if="hasMore" :to="{ query: { page: page + 1 }}">Вперед &gt;</router-link>
          <a v-else class="disabled">Вперед &gt;</a>
        </div>

        <div class="container">
          <form class="search" v-on:submit.prevent="startSearch()">
            <div class="input-group">
            <span class="input-group-btn">
              <button class="btn btn-secondary" type="button" @click="startSearch()">
                <svg-icon iconId="search"></svg-icon>
              </button>
            </span>
              <input type="text" class="form-control" placeholder="Поиск по портфолио" v-model="searchQuery">
              <span class="input-group-btn" v-show="searchQuery">
              <button class="btn btn-clear" type="button" @click="resetSearch">
                <svg-icon iconId="close"></svg-icon>
              </button>
            </span>
            </div>
          </form>

          <div v-if="itemsLoaded && !displayedItems.length" class="noresult">
            Нет результатов
          </div>

          <transition :name="transition">
            <div class="news-list" :key="displayedPage" v-if="displayedPage > 0">
              <transition-group tag="ul" name="item">
                <item v-for="item in displayedItems" :key="item.id" :item="item">
                </item>
              </transition-group>
            </div>
          </transition>

          <user-modal :showModal="userModal" @close="userModal = false"></user-modal>

        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Item from '../components/Item.vue'
import svgIcon from '../components/base/SVG.vue'
import userModal from 'components/UserModal.vue'

export default {
  name: 'item-list',

  components: {
    Item,
    svgIcon,
    userModal
  },

  data () {
    return {
      transition: 'slide-right',
      displayedPage: Number(this.$route.query.page) || 1,
      displayedItems: this.$store.getters.activeItems,
      searchQuery: "",
      itemsLoaded: false,
      userModal: false,
    }
  },

  computed: {
    page () {
      return Number(this.$route.query.page) || 1
    },
    search () {
      return String(this.searchQuery) || ""
    },
    maxPage () {
      const { itemsPerPage, users } = this.$store.state;
      return Math.ceil(users.length / itemsPerPage) || 1
    },
    userToShow () {
      const { userToShow } = this.$store.state;
      return userToShow
    },
    hasMore () {
      return this.page < this.maxPage
    }
  },

  beforeMount () {
      this.loadItems(this.page)
  },

  watch: {
    userToShow () {
      this.userModal = true
    },
    page (to, from) {
      this.loadItems(to, from)
    },
    search () {
      this.UPDATE_SEARCH({ searchQuery: this.searchQuery });
    }
  },

  methods: {
    ...mapActions([
      'FETCH_USERS',
      'UPDATE_SEARCH',
      'FETCH_SEARCH'
    ]),
    loadItems (to = this.page, from = -1) {
      this.$bar.start();
      if (this.$route.query.q) {
        this.FETCH_SEARCH().then(() => {
          this.navigation(to, from)
        })
      } else {
        this.FETCH_USERS().then(() => {
          this.navigation(to, from)
        });
      }
    },

    navigation(to, from) {
      if (this.page < 0 || this.page > this.maxPage) {
        this.$router.replace({ query: { q: this.searchQuery, page: 1 } });
        return
      }
      this.transition = from === -1
        ? null
        : to > from ? 'slide-left' : 'slide-right';
      this.displayedPage = to;
      this.itemsLoaded = true;
      this.displayedItems = this.$store.getters.activeItems;
      console.log(this.displayedItems)
      this.$bar.finish();
    },

    startSearch() {
      this.$router.replace({ query: { q: this.searchQuery, page: 1 } });
      this.loadItems();
    },

    resetSearch() {
      this.searchQuery = "";
      this.startSearch()
    }
  }
}
</script>

<style lang="stylus">
.news-view
  padding-top 65px

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
  margin 30px 0
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


.search
  .btn
    display flex
.icon-search
  width 30px
  height 30px
  fill: white

.btn-clear
  background-color transparent
.icon-close
  width 20px
  height 20px
  fill: gray


@media (max-width 600px)
  .news-list
    margin 10px 0

.noresult
  padding 40px 20px
  text-align center
  font-size 36px
</style>
