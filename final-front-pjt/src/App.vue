<template>
  <div id="app">
    <NavBar/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar
  }
}

</script>


<style>
#app {
  font-family: 'Nanum Gothic', sans-serif;
  margin:0;
  background-color: rgb(26, 25, 25);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: whitesmoke
}

.nav-link {
  font-size: 20px;
  font-weight: bold;
}


</style>
