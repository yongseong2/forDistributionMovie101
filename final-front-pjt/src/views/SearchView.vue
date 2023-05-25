<template>
  <div class="container mt-5">
    <h1 v-if="searchedMovieTitle.length !== 0">"{{ searchedData }}" 검색 결과({{ searchedMovieTitle.length }}개의 결과가 나왔습니다.)</h1>
    <hr v-if="searchedMovieTitle.length !== 0">

    <h1 v-if="searchedMovieTitle.length === 0">"{{ searchedData }}"에 대한 결과가 존재하지 않습니다.</h1>
    <div v-else>
      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4" v-for="movie in searchedMovieTitle" :key="movie.id">
          <div class="card" :class="{ 'hovered': movie.isHovered }">
            <img :src="movie.imageUrl" class="card-img-top" alt="" width="200" height="500" @click="goToDetail(movie.id)" @mouseover="onCardMouseOver(movie)" @mouseleave="onCardMouseLeave(movie)">
            <div class="card-body text-white bg-dark">
              <h5 class="card-title">{{ movie.title }}({{ formatDateTime(movie.release_date) }})</h5>
              <p class="card-text text-end"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const API_KEY = 'eb6632a590213714114bb61c304b7e9c';

export default {
  name:'SearchView',
  data() {
    return {
      searchedMovieTitle: [],
      searchedData: this.$route.params.searchdata
    }
  },
  created() {
    this.searchMovieTitle()
  },
  watch: {
    searchedData() {
      this.searchMovieTitle();
    },
  },
  methods: {
    searchMovieTitle() {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/search/movie?query=${this.searchedData}&include_adult=false&api_key=${API_KEY}`,
      })
        .then((res) => {
          const searchedMovieTitle = res.data.results.map((movie) => {
            const imageUrl = movie.poster_path
              ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
              : require('@/assets/이미지준비중.jpg');
            return {
              imageUrl,
              title: movie.title,
              id: movie.id,
              release_date: movie.release_date,
              isHovered: false
            };
          });
          this.searchedMovieTitle = searchedMovieTitle;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onCardMouseOver(movie) {
      movie.isHovered = true;
    },
    onCardMouseLeave(movie) {
      movie.isHovered = false;
    },
    formatDateTime(datetime) {
        const dateObj = new Date(datetime)
        const year = dateObj.getFullYear()
        
        return `${year}`
    },
    goToDetail(movie_id) {
      this.$router.push({name:'MovieDetailView', params:{movieid: movie_id}})
    }

  },
  beforeRouteUpdate(to, from, next) {
    this.searchedData = to.params.searchdata;
    next();
  }
}
</script>

<style>
.hovered {
  opacity: 60%;
}
</style>
