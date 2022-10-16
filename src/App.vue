<template>
  <div id="app">
    <HeaderBar></HeaderBar>
    <main>
      <router-view></router-view>
    </main>
    <FooterBar></FooterBar>
  </div>
</template>
<script>
  import HeaderBar from "@/components/HeaderBar.vue";
  import FooterBar from "@/components/FooterBar.vue";

  export default {
    components:{
      HeaderBar,
      FooterBar
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
</style>
