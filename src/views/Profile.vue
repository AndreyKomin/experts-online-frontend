<template>
  <div class="user-view">
    <template v-if="me">
      <div class="left-side">
        <user-image-placeholder class="avatar-image" v-if="!me.avatar"></user-image-placeholder>
        <img v-if="me.avatar" class="avatar-image" :src="me.avatar" alt="Avatar">
        <div class="buttons">
          <button class="btn btn-info" @click="avatarModal = true">Обновить фото</button>
          <button class="btn btn-light" @click="removeAvatar()">Удалить фото</button>
        </div>
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

      <avatar-modal :showModal="avatarModal" @close="avatarModal = false"></avatar-modal>
    </template>
  </div>
</template>

<script>

  import { mapActions, mapGetters } from 'vuex';
  import svgIcon from 'components/base/SVG.vue'
  import avatarModal from 'components/AvatarModal.vue'
  import UserImagePlaceholder from 'components/UserImagePlaceholder.vue'

  export default {
  name: 'profile',

  components: {
    svgIcon,
    avatarModal,
    UserImagePlaceholder
  },

  computed: {
    ...mapGetters([
      'me'
    ])
  },
  data() {
    return {
      avatarModal: false
    }
  },
  methods: {
    ...mapActions([
      'UPDATE_ME',
      'UPDATE_AVATAR'
    ]),
    updateProfile() {
      this.UPDATE_ME({
        first_name: this.me.first_name,
        last_name: this.me.last_name,
        login: this.me.login,
        avatar: this.me.avatar,
      }).then((res) => {
        console.log(res)
//        this.$router.go(this.$router.currentRoute);
      });
    },
    removeAvatar() {
      const avatar = null;
      this.UPDATE_AVATAR({ avatar });
    }
  }
}
</script>

<style lang="stylus" scoped>
  .buttons
    display flex
    justify-content space-between

    button
      flex-basis 45%


  .user-view
    display flex
    margin-top 40px

  .left-side
    flex-basis 30%
    margin-right 40px

  .right-side
    flex 1

  .avatar-image
    width 300px

</style>
