<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
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
        >Пороль не менее {{$v.password.$params.minLength.min}} символов. Сейчас он состоит из
          {{password.length}}</small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="name">Имя</label>
        <small class="helper-text invalid"
               v-if="$v.name.$dirty && !$v.name.required"
        >Введите Ваше имя
        </small>
        <small class="helper-text invalid"
               v-if="$v.name.$dirty && !$v.name.required"
        >Name
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree"/>
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import {email, minLength, required} from "vuelidate/lib/validators";

  export default {
    name: "register",
    data: () => ({
      email: '',
      password: '',
      name: '',
      agree: false
    }),
    validations: {
      email: {email, required},
      password: {required, minLength: minLength(6)},
      name: {required},
      agree: {checked: v => v}
    },
    methods: {
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        const formData = {
          email: this.email,
          password: this.password,
          name: this.name
        }
        try {
          await this.$store.dispatch('register', formData)
          this.$router.push('/')
        }catch (e) {

        }

      }
    }
  }
</script>

<style scoped>

</style>
