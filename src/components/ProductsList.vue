<template>
  <section class="produtos-container">
    <transition mode="out-in">
        <div v-if="produtos && produtos.length > 0" class="produtos" :key="produtos.length">
            <div class="produto" v-for="(produto, index) in produtos" :key="index">
                <router-link :to="{ name: 'product', params: { id: produto.id }}">
                    <img v-if="produto.fotos" :src="produto.fotos[0].src" :alt="produto.fotos[0].titulo" />
                    <p class="preco">{{ produto.preco | parseCurrency }}</p>
                    <h2 class="titulo">{{ produto.nome }}</h2>
                    <p>{{ produto.descricao }}</p>
                </router-link>
            </div>
            <ProductsPaginate :produtosTotal="produtosTotal" :perView="perView"></ProductsPaginate>
        </div>
        <div v-else-if="produtos && produtos.length === 0" class="sem-resultado">
            Busca sem resultados. Tente pesquisar outro termo.
        </div>
        <PageLoad v-else></PageLoad>
    </transition>
  </section>
</template>

<script>
    import { api } from '@/services.js';
    import { serialize } from '@/helpers.js';
    import ProductsPaginate from '@/components/ProductsPaginate.vue';

    export default {
        name: "ProductsList",
        components:{
            ProductsPaginate
        },  
        data(){
            return{
                produtos: null,
                perView: 9,
                produtosTotal: 0
            }
        },
        computed:{
            url(){
                const query = serialize(this.$route.query)
                
                return `/produto?_limit=${this.perView}${query}`
            }
        },  
        methods:{
            getProdutos(){
                this.produtos = null
                api.get(this.url)
                .then(response => {
                    this.produtosTotal = Number(response.headers["x-total-count"])
                    this.produtos = response.data

                    console.log(response)
                })
            }
        },
        watch:{
            url(){
                this.getProdutos();
            }
        },
        created(){
            this.getProdutos();
        }
    }
</script>

<style scoped>
    .produtos-container{
        max-width:1000px;
        margin:0 auto;
    }
    .produtos{
        display:grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap:30px;
        margin:30px;
    }

    @media screen and (max-width:500px){
        .produtos{
            grid-template-columns: repeat(2, 1fr);
            grid-gap:10px;
            margin: 10px;
        }
    }
    .produto{
        box-shadow: 0 4px 8px rgba(30,60,90,0.1);
        padding:24px;
        background:#fff;
        border-radius:4px;
        transition: all .2s;
    }

    .produto:hover{
        box-shadow: 0 6px 12px rgba(30,60,90, 0.2);
        transform: scale(1.1);
        position:relative;
        z-index: 1;
    }

    .produto img{
        border-radius:4px;
        margin-bottom:20px;
    }
    .titulo{
        margin-bottom: 10px;
    }
    .preco{
        font-weight:bold;
        color: #e80;
    }
    .sem-resultado{
        text-align:center;
    }
</style>