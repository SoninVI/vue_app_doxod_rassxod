<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{'Exchange Rates' | localaize}}</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>{{'Currency' | localaize}}</th>
            <th>{{'course' | localaize}}</th>
            <th>{{'date of' | localaize}}</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="cur of currencies" :key="cur">
            <td>{{cur}}</td>
            <td>{{rates[cur].toFixed(3)}}</td>
            <td>{{date | date('date')}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "homeCurrency",
    props: ['rates', 'date'],
    data: () => ({
      currencies: ['UAH', 'USD', 'EUR']
    })
  }
</script>

<style scoped>

</style>
