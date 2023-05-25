<template>
  <div v-if="actor" class="card" @mouseover="setOpacity(0.6)" @mouseout="setOpacity(1)">
    <img class="card-img-top object-fit-cover" :src="posterUrl" width="300" height="400" alt="" @click="select">
    <!-- <button @click="select">선택</button> -->
    <div class="card-body text-white bg-dark">
      <h5 class="card-title">{{ actor.name }}</h5>
      <p class="card-text text-end"></p>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

// const API_URL = 'http://127.0.0.1:8000'
const API_URL = 'http://movie101.site:8000'
export default {
  name: 'ActorChallenge',
  props: {
    actor: {
      type: Object,
      required: false,
    },
  },
  computed:{
    posterUrl() {
      const imageUrl = this.actor.img
          ? `${API_URL}/media${this.actor.img}`
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
  width: 60%
}

</style>
