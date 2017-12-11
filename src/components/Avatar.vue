<template>
  <img v-if="src" :src="src" :alt="alt" />
  <img v-else src="/public/img/user-image-placeholder.png" :alt="alt" class="placeholder" />
</template>

<script>
export default {
  name: 'avatar',
  props: {
    src: {
      type: String
    },
    alt: {
      type: String
    }
  }
}
</script>

<style lang="stylus" scoped>
  img
    width 100%

  .placeholder
    border: 1px solid #e9ecef;
    border-radius 2px
</style>
