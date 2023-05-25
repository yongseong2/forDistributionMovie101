<template>

<div class="container d-flex mt-3 justify-content-center">
  <section class="container movie-details d-flex mt-3 justify-content-between" id='movieall'>
      <div class="movie-img" :style="{ 'background-image': `url(${this.poster})` }">
        <div class="movie-info">
            <span class="movie-name">{{ movie.title }}</span>
            <br>{{ movie.release_date}}
          <div class="post-line">
              <span>관람객 평점 :</span> {{ movie.vote_average }}
              <br>
              <span>MOVIE 101 유저 평점 :</span> {{ movie.rate_avg }}
          </div>
          <div class="d-flex justify-content-center row mt-1">
            <YoutubeContent
            :movie-title="movie.title"
            />
            <!-- <img src="@/assets/test.png" alt=""> -->
          </div>
          <div class="post-line mt-3">
            <h4>출연진</h4>
            <hr>
            <span>Director:</span> {{ director }}<br/>
            <span>Actor:</span>{{ actors[0] }}, {{ actors[1] }}, {{ actors[2] }}<br/>  
          </div>
          <br>
          <div v-if="movie.overview">
            <h4>줄거리</h4> 
            <hr>
            {{ movie.overview }}
          </div>
        </div>
      </div>

      <div class="movie-img">
        <div class="movie-info">
            <span class="movie-name">REVIEWS</span> 
          <div class="post-line">
            <ReviewList
            :movie-review="movie.review_set"
            :get-movie-detail="getMovieDetail"
            />
          </div>
        </div>
      </div>
  </section>
</div>
</template>

<script>

import axios from 'axios'
import YoutubeContent from '@/components/Movies/YoutubeContent.vue'
import ReviewList from '@/components/Movies/ReviewList.vue'
// const API_URL = 'http://127.0.0.1:8000'
const API_URL = 'http://movie101.site:8000'

export default {
  name:'MovieDetailView',
  components: {
    YoutubeContent,
    ReviewList,
  },
  data() {
    return {
      movie: '',
      director: '',
      actors: [],
    }
  },
  computed: {
    poster() {
      if (this.movie && this.movie.poster_path) {
        return `https://image.tmdb.org/t/p/original${this.movie.poster_path}`
      }
      return 'https://t1.daumcdn.net/cfile/tistory/233F6D505786DA870A'
    },
  },

  created(){
    this.getMovieDetail()
  },
  methods:{
    getMovieDetail() {
      axios({
        method:'get',
        url: `${API_URL}/movies/${this.$route.params.movieid}/`
      })
      .then(res=>{
        this.movie = res.data
        const directorsString = res.data.directors
        const directorsArray = directorsString.slice(1, -1).split(", ");
        const firstDirector = directorsArray[0].replace(/'/g, ""); // 따옴표 제거
        this.director = firstDirector

        const actorsString = res.data.casts;
        const actorsArray = actorsString.slice(1, -1).split(", ");
        this.actors = actorsArray.map(actor => actor.replace(/'/g, ""))
      })
      .catch(err=>{
        console.log(err)
      })
    },
  }
}
</script>

<style>

.movie-details {  
    box-sizing: border-box;  
    font-size: 1rem; color: #fff; 
    line-height: 1.6em; 
    padding: 0 0 30px; margin: auto; 
    text-align: start; zoom: 1;
    }


.movie-img  { 
  box-sizing: border-box;
  position: relative;
  background-size: 612px;
  width: 612px;
  height: 919px;
  border-radius: 10px;
  }


.movie-img::before {
  content: "";
  opacity: 0.7;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('@/assets/black.PNG');
}


.movie-info {
  position: relative;
  height: 900px;
  z-index: 1;
  margin: 20px;
  letter-spacing: 1.2px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  /* background-color: rgba(0,0,0,0.2); */
}

.movie-info::-webkit-scrollbar {
  width: 0;
  background-color: transparent;
}

#review-list{
  position: relative;
  z-index: 1;
  margin: 20px;
  letter-spacing: 1.2px;
}


.movie-details .movie-info { 
    box-sizing: border-box; 
    margin: 20px; 
    letter-spacing: 1.2px; }
    

.movie-info .movie-name {  
    font-size: 2.5rem; font-weight: 700; 
    line-height: 50px;  }

.about-movie { 
    color: #d9d9d9; 
    font-size: 1rem; }


.movie-details .post-line { 
    padding: 15px 0; }

@media (max-width: 768px) {
  .movie-details {
    flex-direction: column;
    align-items: center;
  }
  .movie-img {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
}




</style>