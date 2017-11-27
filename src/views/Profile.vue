<template>
  <div class="user-view">
    <template v-if="me">
      <div class="left-side">
        {{ me.first_name }} {{ me.last_name }}
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

  export default {
  name: 'profile',

  components: {
    modal,
    svgIcon
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
        login: this.me.login,
        first_name: this.me.first_name,
        last_name: this.me.last_name,
      });
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
