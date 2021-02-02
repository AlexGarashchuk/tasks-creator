<template>
  <div id="app">
  <Navbar />
    <div class="container">
    <div class="wrp"> <router-view/></div>
     
    </div>
  </div>
</template>



<script>
import Navbar from '@/components/Navbar';
  export default {components: {Navbar}}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center
}
.wrp {
  width: 100%;
  max-width: 1200px
}
</style>>
