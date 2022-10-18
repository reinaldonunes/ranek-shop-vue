<template>
  <form class="adicionarProdutos">
    <label for="nome">Nome</label>
    <input type="text" id="nome" name="nome" v-model="produto.nome">

    <label for="preco">Preço</label>
    <input type="number" id="preco" name="preco" v-model="produto.preco">

    <label for="fotos">Fotos</label>
    <input type="file" id="fptos" name="fotos" ref="fotos">

    <label for="descricao">Descrição</label>
    <textarea id="descricao" name="descricao" v-model="produto.descricao"></textarea>

    <input type="button" value="Adicionar Produto" class="btn" @click.prevent="adicionarProduto" />

  </form>
</template>

<script>
import { api } from '@/services.js';

export default {
  name: "ProductAdd",
  data(){
    return{
      produto: {
        nome: "",
        preco: "",
        descricao: "",
        fotos: null,
      }
    }
  },
  methods:{
    formatarProduto(){
      this.produto.usuario_id = this.$store.state.user.id
    },
    adicionarProduto(){
      this.formatarProduto()
      api.post("/produto", this.produto)
        .then(() => {
          this.$store.dispatch("getUserProducts")
        })
    }
  }
}
</script>

<style scoped>
  .adicionarProdutos{
    display:grid;
    grid-template-columns: 100px 1fr;
    align-items: center;
    margin-bottom:60px;
  }
  .btn{
    grid-column: 2;
  }
  textarea{ resize:none; }
</style>