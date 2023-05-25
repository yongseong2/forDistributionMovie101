<template>
  <div id="movie" class="mt-5">
    <h1 class="movieTitle">POPULAR MOVIES</h1>
    <PopularMovie/>

    <h1 class="movieTitle">NOW PLAYING</h1>
    <NowPlaying/>
  </div>
</template>

<script>
import PopularMovie from '@/components/Movies/PopularMovie.vue'
import NowPlaying from '@/components/Movies/NowPlaying.vue'

export default {
  name:'MovieView',
  components:{
    PopularMovie,
    NowPlaying,
  },
  

}
</script>

<style>

#movie {
  background-color: rgb(26, 25, 25);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: whitesmoke
}

.movieTitle{
  font-size: 3.5rem;
}

</style>