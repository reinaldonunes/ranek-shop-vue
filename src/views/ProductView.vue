<template>
  <section v-if="produto" class="produto">
    <div class="produto" v-if="produto">
        <ul class="fotos" v-if="produto.fotos">
            <li v-for="(foto, index) in produto.fotos" :key="index">
                <img :src="foto.src" :alt="foto.titulo" />
            </li>
        </ul>
        <div class="info">
            <h1>{{ produto.nome }}</h1>
            <p class="preco"> {{ produto.preco | parseCurrency }}</p>
            <p class="descricao">{{ produto.descricao }}</p>
            <transition v-if="produto.vendido === 'false'" mode="out-in">
              <button class="btn" v-if="!finalizar" @click="finalizar = true">Comprar</button>
              <FinishedPurchase v-else :produto="produto" />
            </transition>
            <button class="btn btn-disabled" v-else disabled>Produto Vendido</button>
        </div>
    </div>
    <PageLoad v-else></PageLoad>
  </section>
</template>

<script>
  import { api } from '@/services.js';
  import FinishedPurchase from '@/views/FinishedPurchase.vue';

  export default {
    name: "ProductView",
    props: ["id"],
    components:{
      FinishedPurchase
    },
    data(){
      return{
        produto: null,
        finalizar: false
      }
    },
    methods:{
      getProduto(){
        api.get(`/produto/${this.id}`)
          .then(response =>{
            this.produto = response.data
          })
      }
    },
    created(){
        this.getProduto();
    }
  }
</script>

<style scoped>
    .produto{
        display:grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 30px;
        max-width:900px;
        padding:60px 20px;
        margin:0 auto;
    }
    .preco{
        color: #e80;
        font-weight:bold;
        font-size:1.5rem;
        margin-bottom:40px;
    }
    .descricao{
        font-size:1.2rem;
    }
    .btn{
        margin-top:60px;
        width:200px;
    }

    .fotos{
      grid-row:1 / 3;
    }

    .info{
      position:sticky;
      top: 20px;
    }

    @media screen and (max-width:500px){
      .produto{
        grid-template-columns:1fr;
      }

      .fotos{
        grid-row:2;
      }

      .info{
        position:initial;
      }
    }
</style>