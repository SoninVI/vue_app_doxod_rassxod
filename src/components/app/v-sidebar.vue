<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link
      v-for="Link in Links"
      :key="Link.url"
      tag="li"
      active-class="active"
      :to="Link.url"
      :exact="Link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{Link.title}}</a>
    </router-link>
  </ul>
</template>

<script>
    import localaizeFillter from "../../filter/localize.fillter";

    export default {
        props: ['value'],
        name: "v-sidebar",
        data: () => ({
            Links: [
                {title: localaizeFillter ('score'), url: '/', exact:true},
                {title: localaizeFillter ('history'), url: '/history'},
                {title: localaizeFillter ('planning'), url: '/planning'},
                {title: localaizeFillter ('new entry'), url: '/record'},
                {title: localaizeFillter ('categories'), url: '/categories'}
            ]
        })
    }
</script>

<style scoped>

</style>
