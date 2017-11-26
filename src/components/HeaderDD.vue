<template>
  <div class="root">
    {{ me.login }}
  </div>
</template>

<script>
  import svgIcon from 'components/base/SVG.vue'

export default {
  name: 'header-dd',
  components: {
    svgIcon
  },
  data() {
    return {
      me: this.$store.getters.me
    }
  },
  mounted() {
    console.log(1);

    this.$store.dispatch('FETCH_ME')
      .then((me) => {
        this.me = this.$store.getters.me;
      })
      .catch();
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
.root
  background-color red


</style>
