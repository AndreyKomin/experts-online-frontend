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
        <h1 class="name-heading">{{ me.first_name }} {{ me.last_name }} <svg-icon iconId="shield" v-if="!me.isExpert" class="icon-shield" aria-label="Является Экспертом" /></h1>
        <div class="labels mt20">
        </div>

        <form v-on:submit.prevent="updateProfile()">
          <div class="form-group">
            <label for="first_name">Имя</label>
            <input id="first_name" type="text" class="form-control" v-model="me.first_name" />
          </div>

          <div class="form-group">
            <label for="last_name">Фамилия</label>
            <input id="last_name" type="text" class="form-control" v-model="me.last_name" />
          </div>

          <div class="form-group">
            <label for="login">Логин в системе ( <small><a :href="'https://эксперты-онлайн.рф/' + me.login" target="_blank">{{ 'https://эксперты-онлайн.рф/' + me.login }}</a></small> )</label>
            <input id="login" type="text" class="form-control" v-model="me.login" />
          </div>

          <div class="form-group" v-for="messenger in me.available_messengers">
            <label for="telegram">{{ messenger.messenger_id }}</label>
            <input id="telegram" type="hidden" class="form-control" :value="messenger.messenger_unique_id" />
            <input type="hidden" v-model="messenger.code" :value="messenger.code">
          </div>

          <label class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" v-model="me.directInvite">
            <span class="custom-control-indicator"></span>
            <span class="custom-control-description">Разрешить прямое добавление (Пользователю будут показаны ваши контактные данные по запросу)</span>
          </label>

          <div class="form-group">
            <button class="button mt20" @click="updateProfile()">Сохранить</button>
          </div>

          <div class="form-group">
            <button class="btn btn-success" @click="payModal = true">Оплатить консультацию</button>
          </div>
        </form>
      </div>

      <avatar-modal :showModal="avatarModal" @close="avatarModal = false"></avatar-modal>
      <pay-modal :showModal="payModal" @close="payModal = false"></pay-modal>
    </template>
  </div>
</template>

<script>

  import { mapActions, mapGetters } from 'vuex';
  import svgIcon from 'components/base/SVG.vue'
  import avatarModal from 'components/AvatarModal.vue'
  import payModal from 'components/payments/PayModal.vue'
  import UserImagePlaceholder from 'components/UserImagePlaceholder.vue'

  export default {
  name: 'profile',

  components: {
    svgIcon,
    avatarModal,
    payModal,
    UserImagePlaceholder
  },

  computed: {
    ...mapGetters([
      'me'
    ])
  },
  data() {
    return {
      avatarModal: false,
      payModal: false
    }
  },
  methods: {
    ...mapActions([
      'UPDATE_ME',
      'UPDATE_AVATAR'
    ]),
    updateProfile() {
      this.UPDATE_ME({
        ...this.me
      })
    },
    removeAvatar() {
      const avatar = null;
      this.UPDATE_AVATAR({ avatar });
    },
  }
}
</script>

<style lang="stylus" scoped>
  .buttons
    display flex
    justify-content space-between

    button
      flex-basis 45%

  .name-heading
    display flex
    align-items center

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

  .icon-shield
    width 40px
    height 40px
    margin-left 10px

  .mt20
    margin-top 20px
</style>
