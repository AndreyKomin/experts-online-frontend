<template>
  <div class="user-view">
    <template v-if="me">
      <div class="left-side">
          <avatar :avatar="me.avatar">
          </avatar>

        <img :src="me.avatar" alt="Avatar">

      </div>
      <div class="right-side">
        <h1>{{ me.first_name }} {{ me.last_name }}</h1>
        <div class="mt20">
          <b>Рейтинг:</b>
          <ul>
            <li>&#9733; {{ me.rating }} </li>
          </ul>
        </div>
        <div class="labels">
        </div>

        <form v-on:submit.prevent="updateProfile()">
          <div class="form-group">
            <label for="first_name">First Name</label>
            <input id="first_name" type="text" class="form-control" v-model="me.first_name" />
          </div>

          <div class="form-group">
            <label for="last_name">Last Name</label>
            <input id="last_name" type="text" class="form-control" v-model="me.last_name" />
          </div>

          <div class="form-group" v-for="messenger in me.available_messengers">
            <label for="telegram">Last Name</label>
            <input id="telegram" type="text" class="form-control" v-model="messenger.messenger_unique_id" />
            <input type="hidden" v-model="messenger.code" :value="messenger.code">
          </div>

          <button class="button" @click="updateProfile()">Сохранить</button>
        </form>


      </div>

    </template>
  </div>
</template>

<script>

  import { mapActions, mapGetters } from 'vuex';
  import modal from '../components/Modal.vue';
  import svgIcon from 'components/base/SVG.vue'
  import avatar from 'components/Avatar.vue'

  export default {
  name: 'profile',

  components: {
    modal,
    svgIcon,
    avatar
  },

  computed: {
    ...mapGetters([
      'me'
    ])
  },

  methods: {
    ...mapActions([
      'UPDATE_ME'
    ]),
    updateProfile() {
      this.UPDATE_ME({
        first_name: this.me.first_name,
        last_name: this.me.last_name,
        avatar: this.me.avatar,
      }).then(() => {
        this.$router.go(this.$router.currentRoute);
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
  .user-view
    display flex
    margin-top 40px

  .left-side
    flex-basis 30%
    margin-right 40px

  .right-side
    flex 1

</style>
