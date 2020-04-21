<template>
  <div>
    <loader v-if ="loading"/>
    <div class="app-main-layout" v-else>
      <vNavBar @bgmenu="isOpen = !isOpen"/>
      <vSideBar v-model="isOpen" :key="locale"/>
      <main class="app-content"
            :class="{full: !isOpen}">
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Создать новую запись'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import vNavBar from '../components/app/v-nav-bar'
  import vSideBar from '../components/app/v-sidebar'
  import messages from '../utils/msg'
  export default {
    name: "MainLayout",
    data: () => ({
      isOpen: true,
      loading: true

    }),
    computed: {
      error(){
        return this.$store.getters.error
      },
      locale(){
       return this.$store.getters.info.locale
      }
    },
    watch: {
      error (fbError){
        this.$error(messages[fbError.code] || 'Что-то пошло не так')
      }
    },
    async mounted() {
      if (!Object.keys(this.$store.getters.info).length){
        await this.$store.dispatch('fetchInfo')
      }
      this.loading = false
    },
    components: {
      vNavBar,
      vSideBar
    }
  }
</script>

<style scoped>

</style>
