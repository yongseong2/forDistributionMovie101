<template>
  <div v-if="movie" class="card" @mouseover="setOpacity(0.6)" @mouseout="setOpacity(1)">
    <img class="card-img-top" :src="posterUrl" width="100%" height="100%" alt="" @click="select">
    <!-- <button @click="select">선택</button> -->
    <div class="card-body text-white bg-dark">
      <h5 class="card-title">{{ movie.title }}</h5>
      <p class="card-text text-end"></p>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

// const API_URL = 'http://127.0.0.1:8000'


export default {
  name: 'MovieChallenge',
  props: {
    movie: {
      type: Object,
      required: false,
    },
  },
  computed:{
    posterUrl() {
      const imageUrl = this.movie.poster_path
          ? `https://image.tmdb.org/t/p/original${this.movie.poster_path}`
          : require('@/assets/이미지준비중.jpg');
      return imageUrl
    }

  },
  data() {
    return {
      disabled: false,
      value: false,
      imgUrl: null,
    }
  },
  methods: {
    select() {
      this.$emit('choiceEvent')
      this.disabled = true
    },
  setOpacity(opacity) {
      const imgElement = this.$el.querySelector('.card-img-top');
      imgElement.style.opacity = opacity;
    }
  },
}
</script>

<style scoped>

.card {
  width: 60%;
}

</style>
