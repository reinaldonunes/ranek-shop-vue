<template>
  <ul v-if="paginate > 1">
    <li v-for="page in paginate" :key="page">
      <router-link :to="{ query: query(page)}">{{ page }}</router-link>
    </li>
  </ul>
</template>

<script>
    export default {
        name: "ProductsPaginate",
        props:{
          perView:{
            type: Number,
            default: 1
          },
          produtosTotal:{
            type: Number,
            default: 1
          }
        },
        computed:{
          paginate(){
            const total = this.produtosTotal / this.perView
            return (total !== Infinity) ? Math.ceil(total) : 0
          }
        },
        methods:{
          query(page){
            return{
              ...this.$route.query,
              _page: page
            }
          }
        }
    }
</script>

<style scoped>
  ul{
    grid-column: 1 / -1;

  }
  li{
    display: inline-block;
  }
  li a {
    padding: 2px 8px;
    border-radius: 2px;
    margin: 4px;
  }

  li a.router-link-exact-active,
  li a:hover{
    background: #87f;
    color: #fff;
  }
</style>