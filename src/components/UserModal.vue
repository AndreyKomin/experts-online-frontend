<template>
  <modal v-if="showModal">

    <div slot="header" class="title-group">
      <h3 class="title">
        {{ activeUser.first_name }} {{ activeUser.last_name }}
        <svg-icon iconId="shield" v-if="activeUser.isExpert" class="icon-shield" aria-label="Является Экспертом" />
      </h3>
      <div class="price text-right">
        <div class="price-flex" v-if="activeUser.price > 0">
          <div class="amount">
            <strong>{{ activeUser.price }}</strong>
          </div>
          <svg-icon iconId="ruble"></svg-icon>
          <div class="price-time">/ минута</div>
        </div>
      </div>
    </div>

    <div slot="body">

      <div v-show="tab === 'profile'">
        <transition :name="transition">
          <div class="row">
            <div class="right-side col-3">
              <div class="avatar">
                <Avatar :src="activeUser.avatar" :alt="`${activeUser.first_name} ${activeUser.last_name}`" />
              </div>
            </div>
            <div class="item-body col-9">
              <div class="profile-info">
                <div class="portfolio">{{ activeUser.portfolio }}</div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <div v-show="tab === 'contact'">
        <transition :name="transition">
          <div class="contact-buttons">
            <span class="buttons-title">Способы связи:</span>
            <button class="button-icon"
                    :class="messengerName = getMessengerNameById(messenger.messenger_id)"
                    v-for="messenger in activeUser.messengers"
                    @click="openPrompt(messenger.profile_link)">
              <svg-icon :iconId="'btn-' + messengerName"></svg-icon>
            </button>
          </div>
        </transition>
      </div>

      <div v-show="tab === 'pay'">
        <transition :name="transition">
          <div>
            <div v-if="activeUser.paymentInfo">
              <p>
                <strong>Оплатить консультацию с помощью Яндекса</strong>
              </p>
              <div>
                <img src="/public/img/yandex-money.png" alt="Yandex" class="yandex-logo">
              </div>
              <form method="POST" action="https://money.yandex.ru/quickpay/confirm.xml">
                <input type="hidden" name="receiver" :value="activeUser.paymentInfo">
                <input type="hidden" name="formcomment" value="Проект «Железный человек»: реактор холодного ядерного синтеза">
                <input type="hidden" name="short-dest" value="Проект «Железный человек»: реактор холодного ядерного синтеза">
                <input type="hidden" name="label" value="$order_id">
                <input type="hidden" name="quickpay-form" value="donate">
                <input type="hidden" name="targets" value="транзакция {order_id}">
                <input type="hidden" name="sum" :value="totalPrice" data-type="number"> <input type="hidden" name="comment" value="Хотелось бы получить дистанционное управление.">
                <input type="hidden" name="need-fio" value="true"> <input type="hidden" name="need-email" value="true">
                <input type="hidden" name="need-phone" value="false"> <input type="hidden" name="need-address" value="false">
                <div class="custom-controls-stacked">
                  <label class="custom-control custom-radio">
                    <input id="radioStacked3" name="paymentType" type="radio" class="custom-control-input" value="PC">
                    <span class="custom-control-indicator"></span>
                    <span class="custom-control-description">Яндекс.Деньгами</span>
                  </label>
                  <label class="custom-control custom-radio">
                    <input id="radioStacked4" name="paymentType" type="radio" class="custom-control-input" value="AC">
                    <span class="custom-control-indicator"></span>
                    <span class="custom-control-description">Банковской картой</span>
                  </label>
                </div>

                <div class="form-group">
                  <label for="payTime">Какое количество минут хотите оплатить {{ activeUser.first_name }} {{ activeUser.last_name }}?</label>
                  <div class="price-flex">
                    <input id="payTime" type="number" class="form-control input-price" v-model.number="payTime" @input="recountPrice" min="1" max="999" />
                    <div class="flex1"></div>
                    <div class="price-time amount">Сумма: {{ totalPrice }}</div>
                    <svg-icon iconId="ruble"></svg-icon>
                  </div>
                </div>

                <input type="submit" value="Перевести" class="btn btn-success submit">
              </form>
            </div>
            <div v-else>
              У пользователя {{ activeUser.first_name }} {{ activeUser.last_name }} не указан кошелек.
            </div>

          </div>
        </transition>
      </div>


    </div>
    <div slot="footer" class="footer-buttons">
      <button class="btn btn-sm btn-success" v-show="tab !== 'profile'" @click="tab = 'profile'">Профиль</button>
      <button class="btn btn-sm btn-primary" v-show="tab !== 'contact'" @click="tab = 'contact'">Связаться</button>
      <button class="btn btn-sm btn-warning" v-show="tab !== 'pay'" @click="tab = 'pay'">Оплатить</button>
      <button class="btn btn-sm btn-light" @click="closeUser()">Закрыть</button>
    </div>
  </modal>
</template>

<script>

  import { mapActions, mapGetters } from 'vuex';
  import { getMessengerNameById } from '../util/filters';
  import modal from 'components/Modal.vue';
  import svgIcon from 'components/base/SVG.vue'
  import Avatar from 'components/Avatar.vue'

  export default {
    name: "user-modal",
    props: {
      showModal: {
        type: Boolean,
      }
    },
    components: {
      modal,
      svgIcon,
      Avatar,
    },
    data() {
      return {
        tab: "profile",
        transition: 'slide-right',
        payTime: null,
        totalPrice: 0,
      }
    },
    computed: {
      ...mapGetters([
        'activeUser'
      ])
    },
    methods: {
      ...mapActions([
        'EMPTY_USER'
      ]),
      ...{ getMessengerNameById },
      recountPrice() {
        this.totalPrice = this.payTime * this.activeUser.price
      },
      openPrompt(text) {
        window.prompt("Контактная информация", text);
      },
      resetData() {
        this.payTime = null;
        this.totalPrice = 0;
        this.tab = "profile";
      },
      closeUser() {
        this.resetData();
        this.EMPTY_USER({});
        this.$emit('close')
      }
    }
  }
</script>

<style lang="stylus" scoped>

  @import "../styles/variables.styl"
  @import "../styles/user.styl"

  .footer-buttons
    display flex
    width 100%
    justify-content flex-end

    button
      margin-left 10px
  .flex1
    flex 1
  .title-group
    width 100%

  .portfolio
    font-size 16px
    line-height normal
    max-width 600px
    cursor default
    overflow auto
    max-height 400px;

  .contact-buttons
    margin 0 auto 20px
    display flex
    flex-wrap wrap
    justify-content center
    max-width 240px

    .buttons-title
      width 100%
      text-align center

    button
      text-decoration underline
    svg
      width 60px
      height 60px

    .flex
      justify-content flex-start

    .button-icon
      margin 15px 10px 0

  .yandex-logo
    width 300px

  .input-price
    max-width 80px

</style>
