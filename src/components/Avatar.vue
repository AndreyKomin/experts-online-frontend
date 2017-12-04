<template>
  <div>
    <!-- Note that 'ref' is important here (value can be anything). read the description about `ref` below. -->
    <no-ssr>
      <vue-croppie
        ref="croppieRef"
        :enableOrientation="true"
        :enableResize="false"
        @result="result"
        :boundary="{ width: 300, height: 300 }"
        :viewport="{ width: 200, height: 200 }"
      >
      </vue-croppie>
    </no-ssr>

    <a class="btn file-btn">
      <span>Upload</span>
      <input type="file" id="upload" value="Choose a file" accept="image/*" @change="readFile($event)">
    </a>

    <img v-bind:src="avatar" ref="asd">

    <button @click="cropViaEvent()">Crop Via Event</button>
  </div>
</template>

<script>

  import { mapActions } from 'vuex';
  import noSSR from 'vue-no-ssr'

  export default {
    name: "avatar",
    props: {
      avatar: {
        type: String,
      }
    },
    components: {
      'no-ssr': noSSR
    },
    data() {
      return {
        options: {
          format: 'jpeg',
          circle: false,
        }
      }
    },
    mounted() {
      // Upon mounting of the component, we accessed the .bind({...})
      // function to put an initial image on the canvas.
      this.$nextTick(()=>{
        this.$refs.croppieRef.bind({
          url: this.avatar,
        })
      })
    },
    methods: {
      ...mapActions([
        'UPDATE_AVATAR',
      ]),
      readFile(event) {
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
      },
      result(avatar) {
        this.UPDATE_AVATAR({ avatar });
      },
    }
  }
</script>

<style lang="stylus">

</style>
