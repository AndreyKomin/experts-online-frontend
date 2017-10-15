<template>
  <svg class="icon" :class="getClassName()">
    <use ref='svgIcon' xlink:href="" xmlns:xlink="http://www.w3.org/1999/xlink"></use>
  </svg>
</template>

<script>
    export default {
        props: {
            iconClass: String,
            iconId: String,
        },
        mounted() {
            if (this.iconId) {
                this.$refs.svgIcon.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#icon-${this.iconId}`);
            }
        },
        methods: {
            getClassName() {
                const iconClass = (this.iconClass) ? iconClass : '';
                return `icon-${this.iconId} ${iconClass}`
            }
        }
    };
</script>


<style lang="stylus">
  .icon-filter
    width: 20px
    height: 20px
    fill: white

</style>