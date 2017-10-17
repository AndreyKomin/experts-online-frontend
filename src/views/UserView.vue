<template>
  <div class="user-view">
    <template v-if="user">
      <div class="left-side">
        <div class="image">
          <img :src="user.picture.large" :alt="user.name">
        </div>
        <div class="buttons">
          <button class="button-icon" @click="showModal = true">
            <svg-icon iconId="whatsapp"></svg-icon>
          </button>
          <button class="button-icon" @click="showModal = true">
            <svg-icon iconId="telegram"></svg-icon>
          </button>
        </div>
      </div>
      <div class="right-side">
        <h1>{{ user.name }}</h1>
        <div class="mt20">
          <b>Рейтинг:</b>
          <ul>
            <li>&#9733; 4,76 - спикера </li>
            <li>&#9733; 4,25 - слушателя </li>
          </ul>
        </div>
        <div class="labels">
          <router-link class="label orange" :to="{ path: 'search', query: { tags: 'Директ' }}">Директ</router-link>
          <router-link class="label blue" :to="{ path: 'search', query: { tags: 'AdWords' }}">AdWords</router-link>
          <router-link class="label red" :to="{ path: 'search', query: { tags: 'Business' }}">Business</router-link>
        </div>
      </div>

      <modal v-if="showModal" @close="showModal = false" classnames="modal-request">
        <h3 slot="header">Отправить запрос</h3>
        <div slot="body">
          <p>Вы собираетесь отправить запрос на консультацию пользаователю <b>{{ user.name }}</b>. Пожалуйста кратко опишите ваш вопрос.</p>
          <textarea name="message" id="" cols="30" rows="4" class="form-control"></textarea>
          <div class="mt20">
            <label for="promo">Промо-код</label>
            <input type="text" id="promo" class="form-control">
          </div>
        </div>
        <div slot="footer">
          <button class="button" @click="sendRequest">
            Отправить
          </button>
        </div>
      </modal>

    </template>
    <template v-else-if="user === false">
      <h1>User not found.</h1>
    </template>
  </div>
</template>

<script>

  import modal from '../components/Modal.vue';
  import { getUserId } from '../util/filters';
  import svgIcon from 'components/base/SVG.vue'

  export default {
  name: 'user-view',

  components: {
    modal,
    svgIcon
  },

  data() {
    return {
      showModal: false
    }
  },

  computed: {
    user () {
      return this.$store.state.user;
    }
  },

  asyncData ({ store, route: { params: { userID }}}) {
    const id = getUserId(userID);
    return store.dispatch('FETCH_USER', { id })
  },

  methods: {
    sendRequest() {
      this.showModal = false
    }
  }
}
</script>

<style lang="stylus" scoped>

  .mt20
    margin-top 20px

  .labels
    .label
      margin-right 3px
  .buttons
    display flex
    justify-content center
    margin-top 20px
    .button-icon
      border-radius 50%
      height 40px
      width 40px
      margin 0 5px

  .user-view
    background-color #fff
    box-sizing border-box
    padding 2em 3em
    display flex
    justify-content space-between

    h1
      margin 0
      font-size 1.5em
    .meta
      list-style-type none
      padding 0
    .label
      display inline-block
      min-width 4em
    .about
      margin 1em 0
    .links a
      text-decoration underline

  .right-side
    flex 1

    ul
      padding 0
      margin-top 5px
      list-style-type none

  .left-side
    margin-right 20px;

  .modal-mask .button
      width auto
</style>
