<template>
  <modal v-if="showModal" classnames="modal-pay">
    <h3 slot="header">Оплатить консультацию</h3>
    <div slot="body">
      <p>
        <strong>Оплатить консультацию с помощью Яндекса</strong>
      </p>
      <div>
        <img src="/public/img/yandex-money.png" alt="Yandex" class="yandex-logo">
      </div>
      <div>
        <form method="POST" action="https://money.yandex.ru/quickpay/confirm.xml">
          <input type="hidden" name="receiver" value="41001xxxxxxxxxxxx">
          <input type="hidden" name="formcomment" value="Проект «Железный человек»: реактор холодного ядерного синтеза">
          <input type="hidden" name="short-dest" value="Проект «Железный человек»: реактор холодного ядерного синтеза">
          <input type="hidden" name="label" value="$order_id"> <input type="hidden" name="quickpay-form" value="donate">
          <input type="hidden" name="targets" value="транзакция {order_id}">
          <input type="hidden" name="sum" value="4568.25" data-type="number"> <input type="hidden" name="comment" value="Хотелось бы получить дистанционное управление.">
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
          <input type="submit" value="Перевести" class="btn btn-success submit">
        </form>
      </div>
    </div>
    <div slot="footer" class="buttons">
      <button class="btn btn-light" @click="$emit('close')">Отменить</button>
    </div>
  </modal>
</template>

<script>

  import { mapActions } from 'vuex';
  import modal from 'components/Modal.vue';

  export default {
    name: "pay-modal",
    props: {
      showModal: {
        type: Boolean,
      }
    },
    components: {
      modal,
    },
    data() {
      return {
        show: false,
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .yandex-logo
    width 300px

  .submit
    margin-top 20px

  .buttons
    display flex
    width 100%
    justify-content flex-end

    button
      margin-left 10px

</style>
