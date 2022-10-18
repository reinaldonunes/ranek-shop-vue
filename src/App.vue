<template>
  <div id="app">
    <HeaderBar></HeaderBar>
    <main>
        <transition mode="out-in">
          <router-view></router-view>
        </transition>
      </main>
      <FooterBar></FooterBar>
  </div>
</template>
<script>
  import HeaderBar from "@/components/HeaderBar.vue";
  import FooterBar from "@/components/FooterBar.vue";
  
  import { api } from '@/services.js';


  export default {
    components:{
      HeaderBar,
      FooterBar
    },
    created(){
      if(window.localStorage.token){
        api.validateToken()
          .then(() => {
            this.$store.dispatch("getUser")
          })
          .catch(() => {
            window.localStorage.removeItem("token");
          })
      }
    }
  }
</script>
<style>
  *{
    box-sizing:border-box;
  }
  body, ul, li, h1, h2, p{
    margin:0;
    padding:0;
  }
  ul{
    list-style:none;
  }
  body{
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color:#345;
    background:url("./assets/pattern.svg") repeat top;
  }
  a{
    list-style:none;
    color:#345;
    text-decoration: none;
  }
  img{
    max-width:100%;
    display:block;
  }

  .btn{
    display:block;
    padding:10px 30px;
    background:#87f;
    border-radius:4px;
    color:#fff;
    font-size:1rem;
    text-align:center;
    box-shadow: 0 4px 8px rgba(30,60,90,0.2);
    transition: all .3s;
    border:none;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    cursor:pointer;
  }
  .btn:hover{
    background:#65d;
    transform:scale(1.1);
  }

  #app{
    display:flex;
    flex-direction: column;
    min-height:100vh;
  }
  main{
    flex:1;
  }

  input, textarea{
    border-radius: 4px;
    border: none;
    padding: 15px;
    box-shadow: 0 4px 8px rgba(30,60,90,0.1);
    transition:all 0.3s;
    font-size:1rem;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin-bottom:16px;
    border:1px solid transparent;

    transition: all .3s;
  }
  input:hover,
  input:focus,
  textarea:hover,
  textarea:focus{
    outline:none;
    box-shadow: 0 6px 12px rgba(30,60,90,0.2);
    border:1px solid #87f;
  }

  .v-enter,
    .v-leave-to{
        opacity:0;
    }

    .v-enter{
        transform: translate3d(0,-20px, 0);
    }
    .v-leave-to{
        transform: translate3d(0,20px, 0);
    }

    .v-enter-active,
    .v-leave-active{
        transition: 0.3s;
    }
</style>
