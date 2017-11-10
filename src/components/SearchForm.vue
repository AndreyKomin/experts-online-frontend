<template>
  <form action="/search" class="form">
    <input type="text" name="tags" class="form-control" v-model="query">
    <router-link class="btn btn-primary submit" :to="{ path: 'search', query: { tags: query }}">Поиск</router-link>
  </form>
</template>

<script>

  export default {
    name: 'search-form',
    data() {
      return {
        query: ""
      }
    }
  }

</script>


<style lang="stylus" scoped>
  .form
    margin-top 40px
    width 100%

  .submit
    margin-top 10px

  .form-control
    display block
    width 100%
    padding .375rem .75rem
    font-size 1rem
    line-height 1.5
    color #495057
    background-color #fff
    background-image none
    background-clip padding-box
    border 1px solid #ced4da
    border-radius .25rem
    transition border-color ease-in-out .15s,box-shadow ease-in-out .15s

  .form-control:focus
    color #495057
    background-color #fff
    border-color #80bdff
    outline 0
    box-shadow 0 0 0 0.2rem rgba(0,123,255,.25)

  .btn
    display inline-block
    font-weight 400
    text-align center
    white-space nowrap
    vertical-align middle
    -webkit-user-select none
    -moz-user-select none
    -ms-user-select none
    user-select none
    border 1px solid transparent
    padding .375rem .75rem
    font-size 1rem
    line-height 1.5
    border-radius .25rem
    transition background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out

  .btn-primary
    background-color #5682a3
    border 1px solid #5682a3
    color #fff

  .btn-primary.focus, .btn-primary:focus
    box-shadow 0 0 0 0.2rem rgba(0,123,255,.5)
    outline 0
</style>