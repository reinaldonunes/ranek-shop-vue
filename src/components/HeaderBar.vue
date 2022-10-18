<template>
  <header>
    <nav>
        <router-link to="/" class="logo">
            <img src="@/assets/ranek.svg" alt="Ranek" title="Ranek" />
        </router-link>
        <router-link v-if="$store.state.login" class="btn" to="/user">{{ userLogged }}</router-link>
        <router-link v-else to="/login" class="btn">Vender / Login</router-link>
    </nav>
  </header>
</template>

<script>
    export default {
        name: "HeaderBar",
        computed:{
            userLogged(){
                return this.$store.state.user.nome.replace(/ .*/, "")
            }
        }
    }
</script>

<style scoped>
    nav{
        display:flex;
        align-items:center;
        justify-content: space-between;
        padding:14px 18px;
        box-shadow:0 2px 2px 4px rgba(30,60,90,.1); 
        background:#fff;
    }
    .logo{
        padding:10px 0px;
    }
    .logo img{
        width:90px;
    }
</style>