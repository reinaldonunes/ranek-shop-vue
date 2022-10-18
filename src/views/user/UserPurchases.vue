<template>
  <section>
    <div v-if="compras">
      <h2>Compras</h2>
      <div class="produtos-wrapper" v-for="(compra, index) in compras" :key="index">
        <ProductItem v-if="compra.produto" :product="compra.produto">
          <p class="vendedor"><span>Vendedor:</span> {{compra.vendedor_id }}</p>
        </ProductItem>
      </div>
    </div>
  </section>
</template>

<script>
  import ProductItem from '@/components/ProductItem.vue';
  import { api } from '@/services.js';
  import { mapState } from 'vuex';
  
  export default {
    name: "UserPurchases",
    components:{
      ProductItem
    },
    data(){
      return{
        compras: null
      }
    },
    computed:{
      ...mapState(["user", "login"])
    },
    methods:{
      getCompras(){
        api.get(`/transacao?vendedor_id=${this.user.id}`)
          .then(response => {
            this.compras = response.data
          })
      }
    },
    watch:{
      login(){
        this.getCompras()
      }
    },
    created(){
      if(this.login){
        this.getCompras();
      }
    }

  };
</script>

<style scoped>
  .produto-wrapper{
    margin-bottom:40px;
  }
  .vendedor span{
    color:#e80;
    font-weight:bold;
  }
  h2{
    margin-bottom:20px;
  }
</style>
