<template>
  <section>
    <h2>Crie a sua conta</h2>
    <transition mode="out-in" :key="1">
      <div>
        <button v-if="!criar" @click="criar = true" class="btn">Criar conta</button>
        <UserForm v-else :key="1">
          <button class="btn btn-form" @click.prevent="createUser">Criar usuário</button>
        </UserForm>
        <ErrorNotification :errors="errors" :key="2"></ErrorNotification>
      </div>
    </transition>
  </section>
</template>

<script>
  import UserForm from '@/components/UserForm.vue';

  export default {
    name: "LoginCreate",
    components:{
      UserForm
    },
    data(){
      return{
        criar: false,
        errors: []
      }
    },
    methods:{
      async createUser(){
        this.errors = []
        try{
          await this.$store.dispatch("createUser", this.$store.state.user)
          await this.$store.dispatch("logarUsuario", this.$store.state.user)
          await this.$store.dispatch("getUser")
          this.$router.push({ name: "user"})
        }catch(error){
          this.errors.push(error.response.data.message)
        }
      }
    }
  }
</script>

<style scoped>
  h2{
    text-align:center;
    margin-top:40px;
    margin-bottom:10px;
  }
  .btn{
    width:100%;
    max-width: 300px;
    margin-left:auto;
    margin-right:auto;
  }

  .btn-form{
    max-width:100%;
  }
</style>