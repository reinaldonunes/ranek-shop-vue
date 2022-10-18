<template>
  <section>
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
    methods:{
      atualizarUsuario(){
        api.put(`/usuario/${this.$store.state.user.id}`, this.$store.state.user)
          .then(() => {
            this.$store.dispatch("getUser")
            this.$router.push({ name: "user"})
          }).catch(error => {
            console.log(error.response)
          })
      }
    }
  };
</script>

<style>
</style>
