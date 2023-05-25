<template>
  <div>
  <div class="container" id='mainview'>
    <div data-splitting class="headline headline--float">
        MOVIE 101
    </div>
      <div class="subtext">
        당신의 영화 탐험을 위한 32강 영화 월드컵, 다양한 추천 영화와 함께하세요
      </div>
    </div>


    <div class="mx-5">
    <div id="movie" class="mt-5 text-center d-flex justift-content-center row">
    <MoviePickButtons/>
      <NowPlaying/>
    </div>
    </div>
  </div>
</template>


<script>
import Splitting from 'splitting'
// import PopularMovie from '@/components/Movies/PopularMovie.vue'
import NowPlaying from '@/components/Movies/NowPlaying.vue'
import MoviePickButtons from '@/components/Movies/MoviePickButtons.vue'


export default {
  name:'TodayMovieView',
  components: {
    // PopularMovie,
    NowPlaying,
    MoviePickButtons

  },
  mounted() {
    Splitting()
  },
}
</script>

<style lang="scss">
@import "@/assets/main.scss";


  // .vertical-center {
  //   height: 80vh;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  // }

</style>