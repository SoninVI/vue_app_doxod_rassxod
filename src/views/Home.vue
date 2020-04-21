<template>
  <div>
    <div class="page-title">
      <h3>{{'score' | localaize}}</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <loader v-if="loading"/>
    <div v-else class="row">
      <home-bild
        :rates="currency.rates"
      />
      <home-currency
        :rates="currency.rates"
        :date="currency.date"
      />
    </div>
  </div>
</template>

<script>
  import homeBild from "../components/homebild";
  import homeCurrency from "../components/homeCurrency";
  import localaizeFillter from "../filter/localize.fillter";

  export default {
    metaInfo() {
      return {
        title: localaizeFillter('score')
      }
    },
    name: 'Home',
    data: () =>({
      loading: true,
      currency: null
    }),
    async mounted() {
      this.currency = await this.$store.dispatch('fetchCurrency')
      console.log(this.currency)
      this.loading = false
    },
    components: {
      homeBild,
      homeCurrency
    },
    methods:{
      async  refresh (){
        this.loading = true
        this.currency = await this.$store.dispatch('fetchCurrency')
        this.loading = false
      }
    }

  }
</script>
