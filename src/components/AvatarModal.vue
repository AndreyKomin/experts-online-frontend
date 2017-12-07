<template>
  <modal v-if="showModal" classnames="modal-avatar">
    <h3 slot="header">Обновить фото профиля</h3>
    <div slot="body">
      <p>
        <strong>Выберите новое фото</strong>
      </p>
      <div>
        <no-ssr>
          <vue-croppie
              v-show="fileAdded"
              ref="croppieRef"
              :enableOrientation="true"
              :enableResize="false"
              @result="result"
              :boundary="{ width: 400, height: 400 }"
              :viewport="{ width: 300, height: 300 }"
          >
          </vue-croppie>
        </no-ssr>
        <a class="btn file-btn">
          <span>Upload</span>
          <input type="file" id="upload" value="Выберите файл" accept="image/*" @change="readFile($event)">
        </a>
      </div>
    </div>
    <div slot="footer" class="buttons">
      <button class="btn btn-light" @click="$emit('close')">Отменить</button>
      <button class="btn btn-info" v-if="fileAdded" @click="cropViaEvent()">Обновить</button>
    </div>
  </modal>
</template>

<script>

  import { mapActions } from 'vuex';
  import noSSR from 'vue-no-ssr'
  import modal from '../components/Modal.vue';

  export default {
    name: "avatar",
    props: {
      showModal: {
        type: Boolean,
      }
    },
    components: {
      modal,
      'no-ssr': noSSR
    },
    data() {
      return {
        show: false,
        fileAdded: false,
        options: {
          format: 'jpeg',
          circle: false,
        }
      }
    },
    methods: {
      ...mapActions([
        'UPDATE_AVATAR',
      ]),
      readFile(event) {
        this.fileAdded = true;
        if (event.target.files && event.target.files[0]) {
          const reader = new FileReader();
          reader.onload = function (e) {
            this.$refs.croppieRef.bind({
              url: e.target.result,
            })
          }.bind(this);
          reader.readAsDataURL(event.target.files[0]);
        }
        else {
          alert("Sorry - you're browser doesn't support the FileReader API");
        }
      },
      cropViaEvent() {
        this.$refs.croppieRef.result(this.options);
        this.$emit('close');
        this.fileAdded = false;
      },
      result(avatar) {
        this.UPDATE_AVATAR({ avatar });
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .buttons
    display flex
    width 100%
    justify-content flex-end

    button
      margin-left 10px

</style>
