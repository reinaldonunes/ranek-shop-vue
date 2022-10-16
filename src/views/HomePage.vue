<template>
  <section>
    <h1>👍 Compre ou Venda 👎</h1>
    <ProductsSearch></ProductsSearch>
    <ProductsList></ProductsList>
  </section>
</template>

<script>
  import ProductsSearch from "@/components/ProductsSearch.vue";
  import ProductsList from "@/components/ProductsList.vue";

  export default {
      name: 'HomePage',
      components: {
        ProductsSearch,
        ProductsList
      }
  }
</script>

<style scoped>
  h1{
    font-size:2rem;
    color: #87f;
    margin-top:40px;
    text-align:center;
  }
</style>