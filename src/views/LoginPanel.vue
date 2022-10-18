<template>
  <section class="login">
    <h1>Login</h1>    
    <form action="">
      <label for="email">E-mail</label>
      <input type="text" name="email" id="email" v-model="login.email" />

      <label for="password">E-mail</label>
      <input type="password" name="senha" id="senha" v-model="login.senha" />

      <button @click.prevent="logar" class="btn">Logar</button>

      <ErrorNotification :errors="errors"></ErrorNotification>
    </form>
    <p class="recovery-password">
      <a href="http://localhost/ranekwp/wp-login.php?action=lostpassword" target="_blank">Perdeu a senha? Clique aqui.</a>
    </p>

    <LoginCreate></LoginCreate>
  </section>
</template>

<script>
  import LoginCreate from '@/components/LoginCreate.vue';
import ErrorNotification from '@/components/ErrorNotification.vue';

  export default {
    name: "LoginPanel",
    components:{
    LoginCreate,
    ErrorNotification
},
    data(){
      return{
        login:{
          email: "",
          senha: ""
        },
        errors: []
      }
    },
    methods:{
      logar(){
        this.errors = []
        this.$store.dispatch("logarUsuario", this.login)
          .then(response => {
            console.log(response)
            this.$store.dispatch("getUser")
            this.$router.push({ name: "user"})
          }).catch(error => {
            this.errors.push(error.response.data.message)
          })
      }
    }
  }
</script>

<style scoped>
  .login{
    max-width:500px;
    margin:0 auto;
    padding:0 20px;
  }
  h1{
    text-align:center;
    margin-top:40px;
    color:#87f;
    font-size:2rem;
  }

  form{
    display:grid;
  }

  label{
    margin-bottom:5px;
  }
  .btn{
    width:100%;
    max-width:300px;
    margin-left:auto;
    margin-right:auto;
  }
  .recovery-password{
    text-align:center;
    margin: 20px auto 0 auto;
  }

  .recovery-password:hover{
    text-decoration:underline;
    color:#87f;
  }
</style>