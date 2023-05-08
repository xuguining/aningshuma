<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    //  this.$axios.post('/user/login',{
    //    username:'admi',
    //    password:'123456'
    //  }).then((request)=>{
    //    console.log(request);
    //  })
    localStorage.setItem('shopobj-data','[]')
   
  },
};
</script>

<style lang="less">
// .img-auto{
//   width: 100;
//   display: block;
// }
// #app{
//   max-width: 788px
// };
</style>
