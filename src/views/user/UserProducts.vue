<template>
  <section>
    <h2>Adicionar Produto</h2>
    <ProductAdd></ProductAdd>
    <h2>Seus produtos</h2>
    <transition-group v-if="userProducts" name="list" tag="ul">
      <li v-for="product, index in userProducts" :key="index">
        <ProductItem :product="product">
          {{ product.descricao }}
          <button class="deletar" @click="deletarProduto(product.id)">Deletar</button>
        </ProductItem>
      </li>
    </transition-group>
  </section>
</template>

<script>
  import ProductAdd from '@/components/ProductAdd.vue';
  import ProductItem from '@/components/ProductItem.vue';

  import { mapState, mapActions } from 'vuex';

  import { api } from '@/services.js';

  export default {
    name: "UserProducts",
    components:{
      ProductAdd,
      ProductItem
    },
    computed:{
      ...mapState(["login","user","userProducts"])
    },
    methods:{
      ...mapActions(["getUserProducts"]),
      deletarProduto(id){
        const confirm = window.confirm("Deseja remover este produto?")
        
        if(confirm){
          api.delete(`/produto/${id}`)
            .then(() => {
              this.getUserProducts();
            }).catch(error => {
              console.log(error.response);
            })
        }
      }    
    },
    watch:{
      login(){
        this.getUserProducts()
      }
    },
    created(){
      if(this.login){
        this.getUserProducts();
      }
    }

  };
</script>

<style scoped>
  h2{
    margin-bottom:20px;
  }

  .list-enter-active,
  .list-leave-active{
    transition: all .3s;
  }

  .list-enter,
  .list-leave-to{
    opacity: 0;
    transform: translate3d(20px, 0,0);
  }

  .deletar{
    position:absolute;
    top:0;
    right:0;
    background:url("../../assets/remove.svg") no-repeat center center;
    width:24px;
    height:24px;
    text-indent:-140px;
    overflow:hidden;
    cursor:pointer;
    border:none;
  }

</style>
