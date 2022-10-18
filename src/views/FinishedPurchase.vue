<template>
  <section class="finalizar">
    <h2>Endereço de Envio</h2>
    <UserForm>
      <button class="btn" @click.prevent="finalizarCompra">Finalizar compra</button>
    </UserForm>
  </section>
</template>

<script>
  import UserForm from '@/components/UserForm.vue';
  import { api } from '@/services.js';
  import { mapState } from 'vuex';

  export default {
    name: "FinishedPurchase",
    components:{
      UserForm
    },
    props: ["produto"],
    computed:{
      ...mapState(["user"]),
      compra(){
        return{
          comprador_id: this.user.email,
          vendedor_id: this.produto.usuario_id,
          produto: this.produto,
          endereco: {
            cep: this.user.cep,
            rua: this.user.rua,
            numero: this.user.numero,
            bairro: this.user.bairro,
            cidade: this.user.cidade,
            estado: this.user.estado
          }

        }
      }
    },
    methods:{
      criarTransacao(){
        return api.post("/transacao", this.compra)
          .then(() => {
            this.$router.push({ name: "sales"})
          })
      },
      async createUser(){
        try{
          await this.$store.dispatch("createUser", this.$store.state.user)
          await this.$store.dispatch("getUser", this.$store.state.user.email)
          
          await this.criarTransacao();
        }catch(error){
          console.log(error)
        }
      },
      finalizarCompra(){
        if(this.$store.state.login){
          this.criarTransacao()
        }else{
          this.createUser()
        }
      }
    }
  }
</script>

<style scoped>
  h2{
    margin-top:40px;
    margin-bottom:20px;
  }
  .btn{
    background:#e80;
  }
</style>