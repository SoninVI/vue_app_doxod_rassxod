<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{'Amount'| localaize}}</th>
      <th>{{'date of' | localaize}}</th>
      <th>{{'categories'| localaize}}</th>
      <th>{{'type'| localaize}}</th>
      <th>{{'open'| localaize}}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, idx) of records" :key="record.id">
      <td>{{ idx + 1}}</td>
      <td>{{record.amount | currency('UAH')}}</td>
      <td>{{record.data | date('datetime')}}</td>
      <td>{{record.categoryName}}</td>
      <td>
        <span class="white-text badge"
          :class="[record.typeClass]"
        >
          {{record.typeText}}
        </span>
      </td>
      <td>
        <button class="btn-small btn"
                @click="$router.push('/detail-record/' + record.id)"
                v-tooltip="'Просмотреть запись'">
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: "historyTable",
    props:{
      records: {
        required: true,
        type: Array
      }
    }

  }
</script>

<style scoped>

</style>
