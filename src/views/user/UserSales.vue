<template>
  <section>
    <div v-if="vendas">
      <h2>Vendas</h2>
      <div class="produtos-wrapper" v-for="(venda, index) in vendas" :key="index">
        <ProductItem v-if="venda.produto" :product="venda.produto">
          <p class="comprador"><span>Comprador:</span> {{venda.comprador_id }}</p>
        </ProductItem>
        <div class="entrega">
          <h3>Entrega:</h3>
          <ul v-if="venda.endereco">
            <li v-for="(value, key) in venda.endereco" :key="key">
              {{ key}}: {{ value }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import ProductItem from '@/components/ProductItem.vue';
  import { api } from '@/services.js';
  import { mapState } from 'vuex';
  
  export default {
    name: "UserSales",
    components:{
      ProductItem
    },
    data(){
      return{
        vendas: null
      }
    },
    computed:{
      ...mapState(["user", "login"])
    },
    methods:{
      getVendas(){
        api.get(`/transacao?tipo=vendedor_id`)
          .then(response => {
            this.vendas = response.data
          })
      }
    },
    watch:{
      login(){
        this.getVendas()
      }
    },
    created(){
      if(this.login){
        this.getVendas();
      }
    }

  };
</script>

<style scoped>
  .produto-wrapper{
    margin-bottom:40px;
  }
  .comprador span{
    color:#e80;
    font-weight:bold;
  }
  h2{
    margin-bottom:20px;
  }

  .entrega{
    display:grid;
    grid-template-columns: minmax(100px, 200px) 1fr;
    grid-gap:20px;
    margin-bottom:60px;
  }

  h3{
    margin:0px;
    justify-self:end;
  }

  @media screen and (max-width:500px){
    .entrega{
      grid-template-columns: 1fr;
      grid-gap:10px;
    }

    h3{
      justify-self: start;
    }
  }
</style>
