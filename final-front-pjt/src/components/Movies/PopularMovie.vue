<template>
  <div class="popular-movie container-fluid text-center my-3 w-100">
    <div class="row  my-auto justify-content-center">
      <div id="popularcarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner" role="listbox">
          <div v-for="(movie, index) in popularMovies" :key="index" :class="['carousel-item', { 'active': index === 0 }]">
            <div class="col-md-3">
              <div class="card">
                <div class="card-img">
                    <img class="movieImg img-fluid" :src="movie.imageUrl" alt="">
                </div>
                  <router-link :to="{name:'MovieDetailView', params: { movieid: movie?.id }}">
                    <div class="card-img-overlay fs-2"></div>
                  </router-link>
                  <!-- <router-link :to="{ name: 'ProfileView', params: { username: articleDetail?.username } }"> -->
              </div>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev bg-transparent w-aut" href="#popularcarousel" role="button" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        </a>
        <a class="carousel-control-next bg-transparent w-aut" href="#popularcarousel" role="button" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const API_KEY = 'eb6632a590213714114bb61c304b7e9c';

export default {
  name: 'PopularMovie',
  data() {
    return {
      popularMovies: [],
    };
  },
  updated() {
    this.carouselLogic()
  
  },
  created() {
    this.getPopularMovies();
    // this.carouselLogic()
  },
  computed: {
    token() {
      return this.$store.state.token
    }
  },
  methods: {
    getPopularMovies() {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/popular?language=KO&page=1&api_key=${API_KEY}`,
        
      })
        .then((res) => {
          const popularMovies = res.data.results.map((movie) => ({
            imageUrl: `https://image.tmdb.org/t/p/original${movie.poster_path}`, // 이미지 URL 설정 필요
            title: movie.title, // 영화 제목 설정 필요
            id: movie.id
          }));
          this.popularMovies = popularMovies;
        });
    },
    carouselLogic() {
      this.$nextTick(() => {
        let items = Array.from(this.$el.querySelectorAll('.carousel .carousel-item'))
      
        items.forEach((el)=>{
          const minPerSlide = 6
          let next = el.nextElementSibling
          for (let i= 1; i<minPerSlide; i++) {
            if (!next) {
              next = items[0]
            }
            const cloneChild = next.cloneNode(true)
            el.appendChild(cloneChild.children[0])
            next = next.nextElementSibling
          }
        })
      })
    }
  },
};
</script>

<style>


.movieImg{
  width: 100%;
  height: 700px;
  object-fit: cover;

}


.carousel-inner .carousel-item > div {
  margin: 0 15px;
}

@media (max-width: 767px) {
  .carousel-inner .carousel-item > div {
    display: none;
  }
  .carousel-inner .carousel-item > div:first-child {
    display: block;
  }
}

.carousel-inner .carousel-item.active,
.carousel-inner .carousel-item-next,
.carousel-inner .carousel-item-prev {
  display: flex;
}

/* medium and up screens */
@media (min-width: 768px) {
  .carousel-inner .carousel-item-end.active,
  .carousel-inner .carousel-item-next {
    transform: translateX(25%);
  }

  .carousel-inner .carousel-item-start.active,
  .carousel-inner .carousel-item-prev {
    transform: translateX(-25%);
  }
}

.carousel-inner .carousel-item-end,
.carousel-inner .carousel-item-start {
  transform: translateX(0);
}


</style>
