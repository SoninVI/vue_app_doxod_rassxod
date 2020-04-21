<template>
  <div>
    <div class="page-title">
      <h3>{{'planning' | localaize}}</h3>
      <h4>{{info.bill | currency('UAH')}}</h4>
    </div>
    <loader v-if="loading"/>
    <p v-else-if ='!categories.length'
       class="center">Категорий пока нет
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>
    <section v-else>
      <div v-for = "cat of categories"
           :key="cat.id"
      >
        <p>
          <strong>{{cat.title}}:</strong>
          {{cat.spend | currency}} из {{cat.limit | currency}}
        </p>
        <div class="progress"  v-tooltip="cat.tooltip">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import currencyFilter from "../filter/currencyFilter";
  import localaizeFillter from "../filter/localize.fillter";
  export default {
    metaInfo() {
      return {
        title: localaizeFillter('planning')
      }
    },
    name: "planning",
    data: ()=> ({
      loading: true,
      categories: []
    }),
    computed: {
      ...mapGetters (['info'])
    },
    async mounted(){
      const  records = await  this.$store.dispatch('fetchRecords')
      const  categories = await this.$store.dispatch('fetchCategories')

      this.categories = categories.map(cat =>{
        const  spend = records
        .filter(r=> r.categoryId === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return total += +record.amount
        },0)

        const percent = (100* spend / cat.limit)
        const progressPercent = percent >100 ? 100 : percent
        const progressColor = percent < 60
          ? 'green'
          : percent < 100
            ? 'yellow'
            : 'red'

        const tooltipValue = cat.limit - spend
        const tooltip = `${tooltipValue < 0 ? 'Превышен на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`

        return {
          ...cat,
          progressPercent,
          progressColor,
          spend,
          tooltip

        }
      })

      this.loading = false
    }
  }
</script>

<style scoped>

</style>
