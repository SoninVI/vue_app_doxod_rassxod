<template>
  <div>
    <div class="page-title">
      <h3>{{'ProfileTitle' | localaize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
        >
        <label for="description">Имя</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >Введите имя </small>
      </div>
      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import {required} from "vuelidate/lib/validators"
  import localaizeFillter from "../filter/localize.fillter"
  export default {
    metaInfo() {
      return {
        title: localaizeFillter('ProfileTitle')
      }
    },
    name: "profile",
    data:() => ({
      name: '',
      isRuLocale: true
    }),
    validations:{
      name: {required}
    },
    mounted() {
      this.name = this.info.name
      this.isRuLocale = this.info.locale === 'ru-Ru'
      setTimeout(() => {
        M.updateTextFields()
      }, 0)

    },
    computed:{
      ...mapGetters([`info`])
    },
    methods: {
      ...mapActions(['updateInfo']),
      async submitHandler(){
        if (this.$v.$invalid){
          this.$v.$touch();
          return
        }
        try {
          await  this.updateInfo({
            name: this.name,
            locale: this.isRuLocale ? 'ru-RU' : 'en-US'
          })
        } catch (e) {}
      }
    }
  }
</script>

<style scoped>
  .switch{
    margin-bottom: 15px;
  }
</style>
