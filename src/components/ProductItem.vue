<template>
  <div class="produto" v-if="product">
    <router-link :to="{ name: 'product', params: {id: product.id }}" class="produto-img">
      <img v-if="product.fotos" :src="product.fotos[0].src" :alt="product.fotos[0].titulo" />
      <p>Ver produto</p>
    </router-link>
    <div class="info">
      <p class="preco">{{ product.preco | parseCurrency}}</p>
      <h2 class="titulo">{{ product.nome }}</h2>
      <slot></slot>
    </div>
  
  </div>
</template>

<script>
export default {
  name: "ProductItem",
  props: ["product"]
}
</script>

<style scoped>
  .produto{
    display:grid;
    grid-template-columns: minmax(100px, 200px) 1fr;
    grid-gap:20px;
    margin-bottom:40px;
    position:relative;
  }
  .info{
    align-self: end;
  }
  .produto-img{
    border-radius:4px;
    overflow: hidden;
    height:100px;
  }
</style>