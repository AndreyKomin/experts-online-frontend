<template>
  <div class="profile container">
    <template v-if="me">
      <div class="row">
        <div class="col-lg-4 text-center">
          <user-image-placeholder class="avatar-image" v-if="!me.avatar"></user-image-placeholder>
          <a href="" v-on:click.prevent="avatarModal = true">
            <img v-if="me.avatar" class="avatar-image" :src="me.avatar" alt="Avatar">
          </a>
          <div class="buttons">
            <button class="btn btn-info" @click="avatarModal = true">Обновить фото</button>
            <button class="btn btn-light" @click="removeAvatar()">Удалить фото</button>
          </div>
        </div>
        <div class="col-lg-8">
          <h2 class="name-heading">{{ me.first_name }} {{ me.last_name }} <svg-icon iconId="shield" v-if="me.isExpert" aria-label="Является Экспертом" /></h2>
          <div class="labels mt20">
          </div>

          <form v-on:submit.prevent="updateProfile()">
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="first_name">Имя</label>
                  <input id="first_name" type="text" class="form-control" v-model="me.first_name" />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label for="last_name">Фамилия</label>
                  <input id="last_name" type="text" class="form-control" v-model="me.last_name" />
                </div>
              </div>
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
              <span class="custom-control-description">Разрешить прямое добавление <br><small>(Пользователю будут показаны ваши контактные данные по запросу)</small></span>
            </label>


            <div class="form-group">
              <label for="portfolio">Портфолио</label>
              <textarea id="portfolio" type="text" class="form-control" rows="6" v-model="me.portfolio" placeholder="Опишите ваш опыт и деятельность. По данному тексту будет осуществляться поиск."></textarea>
            </div>

            <div class="form-group">
              <label for="price">Стоимось минуты разговора с Вами (в рублях)
                <br>
                <small>Стоимость рекомендованной первой 5-ти минутной консультации ~ {{ me.price * 5 }} руб.</small>
              </label>
              <input id="price" type="text" class="form-control input-price" v-model="me.price" />
            </div>

            <div class="form-group text-right">
              <button class="btn btn-info" @click="updateProfile()">Сохранить</button>
            </div>

            <div class="form-group">
              <button class="btn btn-success" @click="payModal = true">Оплатить консультацию</button>
            </div>
          </form>
        </div>
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
  @import "../styles/variables.styl"

  .buttons
    margin-top 20px
    display flex
    justify-content space-between

    +responsive(mobile tablet)
      max-width 300px
      margin 20px auto

    button
      flex-basis 45%

  .name-heading
    display flex
    align-items center

    +responsive(mobile)
      font-size 24px

  .profile
    margin-top 40px
    background white
    border-radius 3px
    padding 30px

    +responsive(mobile)
      padding 10px
      margin-top 0

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

  .flex
    display flex

  .input-price
    max-width 100px
</style>
