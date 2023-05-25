<template>
  <div class="col-md-3">
    <!-- <div class="card">
        <div class="card-img">
          <img :src="imgSrc" alt="">
        </div>
        <div class="card-img-overlay">Slide 1</div>
      </div> -->
  </div>
    
  
</template>

<script>
export default {
  name:"PopularMovieItem",
  props:{
    popularMovie:Object
  },
  computed: {
    imgSrc() {
      return `https://image.tmdb.org/t/p/original${this.popularMovie.poster_path}`
    }
  }

}
</script>

<style>

</style>