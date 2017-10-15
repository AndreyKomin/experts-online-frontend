<template>
  <div class="root">
    <button @click="toggleFilterArea" class="filter-button">
      <svg-icon iconId="filter" />
      <span>Фильтр</span>
    </button>
    <div class="filter-area" v-show="filterAreaIsVisible">
      <input type="text">

      <div>
        <div v-for="d in 0">
          test {{d}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import svgIcon from 'components/base/SVG.vue'

export default {
  name: 'experts-filter',
  components: {
    svgIcon
  },
  data() {
    return {
      filterAreaIsVisible: false
    }
  },
  methods: {
    toggleFilterArea() {
      this.filterAreaIsVisible = !this.filterAreaIsVisible
    }
  }
}
</script>

<style lang="stylus" scoped>
.root
  justify-self flex-end

.filter-area
  position: absolute
  left 0
  right 0
  top 55px
  background-color white
  border-radius 2px
  box-shadow 0 0 5px rgba(0, 0, 0, 0.12), 0 5px 5px rgba(0, 0, 0, 0.12)
  padding 20px

  &::before
    content ""
    display block
    width 0
    height 0
    border-style solid
    border-width 0 7px 8px 7px
    border-color transparent transparent #ffffff transparent
    position absolute
    top: -8px;
    right: 16px;

.filter-button
  cursor pointer
  background-color #5682a3
  border 1px solid white
  border-radius 3px
  padding 5px
  display flex
  align-items center
  color white
  font-weight 500
  svg
    margin-right 3px

</style>
