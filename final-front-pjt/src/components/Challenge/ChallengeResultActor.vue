<template>
  <div>
    <div v-if="movie" class="mt-3 d-flex justify-content-center">
      <div id="challenge" class="card">
        <img :src="poster" alt="" width="100%" height="100%" class="card-img-top">
        <div class="card-body bg-dark text-light">
          <h5 class="card-title">{{ movie.title }}</h5>
          <p class="card-text">{{ movie.overview }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// const API_URL = 'http://127.0.0.1:8000'
const API_URL = 'http://movie101.site:8000'


export default {
  name: 'ChallengeResultActor',
  data() {
    return {
      movie: null,
    }
  },
  props: {
    winner: Object
  },
  computed: {
    poster() {
      if (this.movie && this.movie.poster_path) {
        return `https://image.tmdb.org/t/p/original${this.movie.poster_path}`
      }
      return 'https://t1.daumcdn.net/cfile/tistory/233F6D505786DA870A'
    },
  },
  mounted() {
    this.getRecommendedMovie()

  },
  methods: {
    getRecommendedMovie() {
      axios({
        method:'get',
        url: `${API_URL}/today/actors/results/${this.winner.id}/`
      })
      .then(res=>{
        this.movie = res.data
      })
      .catch(()=> {
        alert('죄송합니다. 추천영화가 없습니다.')
        this.$router.push({name:'MainView'})
      })

    }
  }

}
</script>

<style>
#challenge {
  width: 60%;
}


.movie-img-result{
  width: 464px;
  height: 600px
}
</style>