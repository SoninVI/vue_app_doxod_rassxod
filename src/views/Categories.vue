<template>
  <div>
    <div class="page-title">
      <h3>{{'categories' | localaize}}</h3>
    </div>
    <section>
      <loader v-if="loading"/>
      <div class="row" v-else>
        <CategoriesCreate @created="addNewCategory"/>
        <CategoriesEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"
        />
        <p v-else class="center">{{'No category yet' | localaize}}</p>
      </div>
    </section>
  </div>
</template>

<script>
  import CategoriesCreate from "../components/categoriesCreate";
  import CategoriesEdit from "../components/categoriesEdit";
  import localaizeFillter from "../filter/localize.fillter";

  export default {
    metaInfo() {
      return {
        title: localaizeFillter('categories')
      }
    },
    name: "Categories",
    data: ()=>({
      categories: [],
      loading: true,
      updateCount: 0
    }),
    async mounted(){
      this.categories = await this.$store.dispatch('fetchCategories')
      console.log(this.categories)
      this.loading = false
    },
    components: {CategoriesEdit, CategoriesCreate},
    methods: {
      addNewCategory(category){
        this.categories.push(category)
      },
      updateCategories(category){
        const idx = this.categories.findIndex(c => c.id === category.id)
        this.categories[idx].title = category.title
        this.categories[idx].limit = category.limit
        this.updateCount++
      }
    }
  }
</script>

<style scoped>

</style>
