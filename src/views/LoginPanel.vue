<template>
  <section class="login">
    <h1>Login</h1>    
    <form action="">
      <label for="email">E-mail</label>
      <input type="text" name="email" id="email" v-model="login.email" />

      <label for="password">E-mail</label>
      <input type="password" name="password" id="password" v-model="login.password" />

      <button @click.prevent="logar" class="btn">Logar</button>
    </form>
    <p class="recovery-password">
      <a href="/" target="_blank">Perdeu a senha? Clique aqui.</a>
    </p>

    <LoginCreate></LoginCreate>
  </section>
</template>

<script>
  import LoginCreate from '@/components/LoginCreate.vue';

  export default {
    name: "LoginPanel",
    components:{
      LoginCreate
    },
    data(){
      return{
        login:{
          email: "",
          password: ""
        }
      }
    },
    methods:{
      logar(){
        this.$store.dispatch("getUser", this.login.email)
        this.$router.push({ name: "user"})
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