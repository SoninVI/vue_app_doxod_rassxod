<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Edit' | localaize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option
              v-for="c of categories"
              :key="c.id"
              :value="c.id"
            >
              {{c.title}}
            </option>
          </select>
          <label>{{'Select a category'|localaize}}</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{invalid: ($v.title.$dirty && !$v.title.required)}"
          >
          <label for="name">{{'TitleCategory' | localaize}}</label>
          <span
            v-if = "($v.title.$dirty && !$v.title.required)"
            class="helper-text invalid"
          >
            {{'Enter a category name' | localaize}}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: ($v.limit.$dirty && !$v.limit.minValue)}"
          >
          <label for="limit">{{'Limit'|localaize}}</label>
          <span
            class="helper-text invalid"
            v-if="($v.limit.$dirty && !$v.limit.minValue)"
          >
            {{'Minimum value'|localaize}} {{$v.limit.$params.minValue.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'Refresh' | localaize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import {minValue, required} from "vuelidate/lib/validators";


  export default {
    props: {
      categories: {
        type: Array,
        required: true
      }
    },
    name: "categoriesEdit",
    data: () => ({
      select: null,
      title: '',
      limit: 100,
      current: null
    }),
    validations: {
      title: {required},
      limit: {minValue: minValue(100)}
    },
    methods:{
      async submitHandler(){
        if (this.$v.$invalid){
          this.$v.$touch()
          return
        }
        try {
          const categoryData = {
            id: this.current,
            title: this.title,
            limit: this.limit
          }
          const category = await this.$store.dispatch('updateCategory',categoryData)
          this.$message('категория обновлена')
          this.$emit('updated', categoryData)
          this.title = ''
          this.limit = 100
          this.$v.$reset()
          this.$message ('Категория создана')
          this.$emit('created', category)
        }catch (e) {

        }

      }
    },
    created() {
      const {id, title, limit} = this.categories[0]
      this.current = id
      this.title = title
      this.limit = limit
    },
    mounted() {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    },
    destroyed() {
      if (this.select && this.select.destroyed){
        this.select.destroyed()
      }
    },
    watch: {
      current(catId){
        const {title, limit} = this.categories.find(c => c.id === catId)
        this.title = title
        this.limit = limit
      }
    }
  }
</script>

<style scoped>

</style>
