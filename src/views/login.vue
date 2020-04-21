<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >Поле email не заполненно </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >Введите коректный email </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">пароль</label>
        <small class="helper-text invalid"
               v-if="$v.password.$dirty && !$v.password.required"
        >Введите пароль</small>
        <small class="helper-text invalid"
               v-else-if="$v.password.$dirty && !$v.password.minLength"
        >Пороль не менее {{$v.password.$params.minLength.min}} символов. Сейчас он состоит из {{password.length}}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        нет аккаунта?
        <router-link to="/register">зарегистрироваться</router-link>
      </p>
    </div>
  </form>

</template>

<script>
  import  {email, required, minLength} from 'vuelidate/lib/validators'
  import messages from '@/utils/msg.js'
  import localaizeFillter from "../filter/localize.fillter";

  export default {
    name: "Login",
    data: () => ({
      email: '' ,
      password: ''
    }),
    validations:{
      email: {email, required},
      password: {required, minLength: minLength(6)}
    },
    mounted() {
      if(messages[this.$route.query.message]){
        this.$message(messages[this.$route.query.message])
      }
    },
    methods:{
      async submitHandler(){
        if (this.$v.$invalid){
          this.$v.$touch();
          return
        }
        const formData = {
          email: this.email,
          password: this.password
        };
        try {
          await this.$store.dispatch ('login', formData)
          this.$router.push('/')
        } catch (e) {}
      }
    }
  }
</script>

<style scoped>

</style>

