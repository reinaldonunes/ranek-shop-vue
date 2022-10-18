<template>
  <section>
    <ErrorNotification :errors="errors"></ErrorNotification>
    <UserForm>
      <button class="btn" @click.prevent="atualizarUsuario">Atualizar dados</button>
    </UserForm>
  </section>
</template>

<script>
  import UserForm from '@/components/UserForm.vue';
  import { api } from '@/services.js';

  export default { 
    name: "UserEdit",
    components: {
      UserForm
    },
    data(){
      return{
        errors: []
      }
    },
    methods:{
      atualizarUsuario(){
        this.errors = []
        api.put(`/usuario`, this.$store.state.user)
          .then(() => {
            this.$store.dispatch("getUser")
            this.$router.push({ name: "user"})
          }).catch(error => {
            this.errors.push(error.response.data.message)
          })
      }
    }
  };
</script>

<style>
</style>
