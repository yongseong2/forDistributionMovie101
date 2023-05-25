<template>
  <div class="container">
    <div v-if="!finishFlag">
      <div class="text-center">
        <h1>{{ roundNum }}강</h1>
        <h5>마음에 드는 영화를 선택해주세요!</h5>
      <hr>
      </div>
      <div v-if="!left" class="text-center">
        <button class="btn btn-outline-light mt-5" @click="next">{{ roundNum }}강 시작하기</button>
      </div>
      <div class="row">
        <div class="col-lg-5 col-md-5 col-sm-5 mb-2">
          <div class="d-flex justify-content-center">
            <MovieChallenge id="left" :movie="left" @choiceEvent="leftChoice"/>
          </div>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-2 mb-2 d-flex justify-content-center align-items-center">
          <h1 v-if="vsClicked">
            VS
            </h1>
        </div>
        <div class="col-lg-5 col-md-5 col-sm-5 mb-2">
          <div class="d-flex justify-content-center">
            <MovieChallenge id="right" :movie="right" @choiceEvent="rightChoice"/>
          </div>
        </div>
      </div>
    </div>

    <div v-if="finishFlag" class="">
      <div>
        <h1 class="text-center">우승!</h1>
        <hr>
        <MovieWinner 
        class="d-flex justify-content-center row"
        id="winner" 
        :winner="winner" 
        :movie="left" 
        @choiceEvent="winnerChoice"/>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import MovieChallenge from '@/components/Challenge/MovieChallenge.vue'
import MovieWinner from '@/components/Challenge/MovieWinner.vue'


// const API_URL = 'http://127.0.0.1:8000'
const API_URL = 'http://movie101.site:8000'
export default {
  name: 'MovieChallengeView',
  components: {
    MovieChallenge,
    MovieWinner,
  },
  data() {
    return {
      current_round: [],
      next_round: [],
      roundNum: 32,
      left: null,
      right: null,
      finishFlag: false,
      winner: null,
      vsClicked: false,
    }
  },
  methods: {
    // 32강 리스트 받기
    getMovieChallengeList() {
      axios({
        method: 'get',
        url:`${API_URL}/today/movies/`
      })
      .then(res=>{
        this.current_round = res.data
      })
    },
    leftChoice() {
      this.next_round.push(this.left)
      this.left = null
      this.right = null
      this.next()
    },
    rightChoice() {
      this.next_round.push(this.right)
      this.left = null
      this.right = null
      this.next()
    },
    winnerChoice() {
      this.winner = this.left
      this.finishFlag = true
    },
    next() {
      this.vsClicked = true
      this.left = this.current_round.pop()
      this.right = this.current_round.pop()
    },
  },
  watch: {
    // 라운드 종료를 판별함
    left() {
      if(this.current_round.length === 0 && !this.left) {
        this.current_round = this.next_round
        this.next_round = []
        this.roundNum = this.current_round.length
        this.vsClicked = false
      }
    },
    // 우승자 판별함
    right() {
      if(this.next_round.length === 0 && this.current_round.length === 1 && !this.left && !this.right) {
        this.left = this.current_round.pop()
        this.finishFlag = true
      }
    }
  },
  created() {
    this.getMovieChallengeList()
  },
}
</script>

<style>

</style>