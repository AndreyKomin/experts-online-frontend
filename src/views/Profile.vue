<template>
  <div class="profile container">
    <template v-if="me">
      <div class="row">
        <div class="col-lg-4 text-center">
          <a href="" v-on:click.prevent="avatarModal = true">
            <Avatar class="avatar-image" :src="me.avatar" :alt="`${me.first_name} ${me.last_name}`" />
          </a>
          <div class="buttons">
            <button class="btn btn-primary" @click="avatarModal = true">Обновить фото</button>
            <button class="btn btn-light" @click="removeAvatar()">Удалить фото</button>
          </div>

          <div class="profile-progress progress">
            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" :aria-valuenow="progress.portfolio + progress.avatar + progress.contacts" aria-valuemin="0" aria-valuemax="100" :style="`width: ${progress.portfolio + progress.avatar + progress.contacts}%`"></div>
          </div>

          <div class="messengers">
            <h3>Способы связи:</h3>
            <div class="form-group" v-for="messenger in allMessengers">
              <label :for="'messenger-' + messenger.id">{{ messenger.name }}</label>
              <template v-if="me.messengers && me.messengers[messenger.code]" >
                <input :id="'messenger-' + messenger.id" type="text" class="form-control" v-model="me.messengers[messenger.code].profile_link" />
              </template>
              <template v-else>
                <button @click="addMessenger(messenger.code)">Add</button>
              </template>
              <input type="hidden" :value="messenger.messenger_unique_id" />
              <input type="hidden" :value="messenger.code">
            </div>
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
              <label for="login">Логин в системе ( <small><a :href="'https://эксперты-онлайн.рф/' + me.login" target="_blank">{{ 'http://эксперты-онлайн.рф/' + me.login }}</a></small> )</label>
              <input id="login" type="text" class="form-control" v-model="me.login" maxlength="32" />
            </div>

            <label class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" v-model="me.directInvite">
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description">Разрешить прямое добавление <br><small>(Пользователю будут показаны ваши контактные данные по запросу)</small></span>
            </label>

            <div class="form-group" v-if="recountPortfolio()">
              <label for="portfolio">Портфолио (<small>Макс. {{ portfolioMax }} символов {{ portfolio ? ', осталось ' + (portfolioMax - portfolio) : '' }}</small>)</label>
              <textarea id="portfolio" type="text" class="form-control" rows="6" v-model="me.portfolio" @input="recountPortfolio" placeholder="Опишите ваш опыт и деятельность. По данному тексту будет осуществляться поиск." :maxlength="portfolioMax"></textarea>
            </div>

            <div class="form-group" v-if="recountWantEarn()">
              <label class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" v-model="me.wantEarn" @change="recountWantEarn(!me.wantEarn)">
                <span class="custom-control-indicator"></span>
                <span class="custom-control-description">Хочу зарабатывать</span>
              </label>
            </div>

            <div v-if="wantEarn">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group" v-if="recountPrice()">
                    <label for="price">Стоимось минуты разговора с Вами
                      <br>
                      <small>Стоимость 15-ти минутной консультации ~ {{ price * recommendTime }} руб.</small>
                    </label>
                    <div class="price-flex">
                      <svg-icon iconId="ruble"></svg-icon>
                      <div class="price-time">/ минута</div>
                      <input id="price" type="text" class="form-control input-price" v-model="me.price" @input="recountPrice"/>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <div class="d-none d-sm-block"><br></div>
                    <label class="custom-control custom-radio">
                      <input id="paymentType" name="paymentType" type="radio" class="custom-control-input">
                      <span class="custom-control-indicator"></span>
                      <span class="custom-control-description">Постоплата</span>
                    </label>
                    <label class="custom-control custom-radio">
                      <input id="radio2" name="paymentType" type="radio" class="custom-control-input">
                      <span class="custom-control-indicator"></span>
                      <span class="custom-control-description">Предоплата</span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="payment-group">
                <div class="flex1">
                  <div class="form-group">
                    <label for="paymentInfo">Яндекс кошелёк</label>
                    <input id="paymentInfo" type="text" class="form-control" v-model="me.paymentInfo" maxlength="64" placeholder="41001xxxxxxxxxxxx" />
                  </div>
                </div>
                <div>
                  <div class="form-group">
                    <label>&nbsp;</label>
                    <button class="btn btn-success" @click="payModal = true">Тест оплаты</button>
                  </div>
                </div>
              </div>

            </div>

            <div class="form-group text-right">
              <button class="btn btn-primary" @click="updateProfile()">Сохранить</button>
            </div>
          </form>
        </div>
      </div>


      <avatar-modal :showModal="avatarModal" @close="avatarModal = false"></avatar-modal>
      <pay-modal @close="payModal = false"
                 :showModal="payModal"
                 :paymentInfo="me.paymentInfo"></pay-modal>
    </template>
  </div>
</template>

<script>

  import { mapActions, mapGetters } from 'vuex';
  import { PORTFOLIO_MAX, RECOMMEND_TIME_MINUTES, MESSENGERS } from './../config'
  import svgIcon from 'components/base/SVG.vue'
  import avatarModal from 'components/AvatarModal.vue'
  import payModal from 'components/payments/PayModal.vue'
  import Avatar from 'components/Avatar.vue'

  export default {
  name: 'profile',

  components: {
    svgIcon,
    avatarModal,
    payModal,
    Avatar,
  },

  computed: {
    ...mapGetters([
      'me'
    ])
  },
  data() {
    return {
      avatarModal: false,
      payModal: false,
      wantEarn: false,
      allMessengers: MESSENGERS,
      portfolioMax: PORTFOLIO_MAX,
      recommendTime: RECOMMEND_TIME_MINUTES,
      portfolio: 0,
      price: 0,
      progress: {
        portfolio: 0,
        avatar: 0,
        contacts: 0
      },
      contacts: {
        telegram: false,
        skype: false,
        facebook: false,
        whatsapp: false,
        google: false,
      }
    }
  },
  watch: {
    portfolio(val) {
      if (val >= 50) {
        this.progress.portfolio = 30
      }
    },
    me(val) {
      if (val.avatar && val.avatar.length > 0) {
        this.progress.avatar = 30
      } else {
        this.progress.avatar = 0
      }
    },
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
    recountPortfolio() {
      this.portfolio = (this.me.portfolio) ? this.me.portfolio.length : 0;
      return true;
    },
    recountPrice() {
      this.price = this.me.price;
      return true;
    },
    recountWantEarn() {
      this.wantEarn = this.me.wantEarn;
      return true;
    },
    addMessenger(code) {
      this.me.messengers[code] = {
        user_id: 1,
        messenger_id: 2,
        messenger_unique_id: "377796775981159",
        profile_link: "vkvk",
      }
    },
  }
}
</script>

<style lang="stylus" scoped>
  @import "../styles/variables.styl"

  .profile-progress
    margin-top 20px

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

  .price-flex
    display flex
    align-items center
    svg
      margin-right 5px
      width 38px
      height 38px

    .price-time
      margin-right 7px

  .messengers
    margin-top 30px
    text-align left
    h3
      font-size 24px

  .payment-group
    display flex

    .flex1
      flex 1
      margin-right 20px
    button
      width 100%
</style>
