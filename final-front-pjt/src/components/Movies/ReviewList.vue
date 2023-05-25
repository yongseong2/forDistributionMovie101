<template>
  <div>
    <div style = "display:flex; justify-content:flex-end">
      <button @click="openModal" class="btn btn-light mt-3 mb-3">리뷰작성하기</button>
    </div>
    
    <div class="review-list-container">
      <ol class="ordered-nav">
        <ReviewListItem
          v-for="review in movieReview"
          :key="review.id"
          :review="review"
          :get-movie-detail="getMovieDetail"
          :rate="review.rate"
          :review-id="review.id"

          @review-deleted="getMovieDetail"
          @review-updated="getMovieDetail"
        />
      </ol>

      <!-- 모달 창 -->
      <div v-if="modalOpen" class="modal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-dark">리뷰 작성</h5>
            </div>
            <div class="modal-body">

                <textarea v-model="review" type="text" class="form-control" placeholder="리뷰 작성"></textarea>
  
                <input v-model="rate" type="number" class="form-control mt-3" placeholder="평점 작성">

            </div>
            <div class="modal-footer">
              <button @click="closeModal" type="button" class="btn btn-secondary">Close</button>
              <button @click="submitReview" type="button" class="btn btn-primary">작성 완료</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ReviewListItem from '@/components/Movies/ReviewListItem.vue'

// const API_URL = 'http://127.0.0.1:8000'
const API_URL = 'http://movie101.site:8000'

export default {
  name: 'ReviewList',
  data() {
    return {
      review: '',
      rate: '',
      modalOpen: false
    }
  },
  components: {
    ReviewListItem
  },
  props: {
    movieReview: Array,
    getMovieDetail: Function,
  },
  computed: {
    token() {
      return this.$store.state.token
    }

  },
  methods: {
    openModal() {
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
      this.review = '';
      this.rate = 0;
    },
    submitReview() {
      if (this.review === '') {
        alert('리뷰를 작성해주세요.')
        return
      }
      else if(this.rate === '' || isNaN(this.rate) || this.rate < 0 || this.rate > 5) {
        alert('0부터 5까지의 숫자로 평점을 입력해주세요.')
        return
      }


      const movieId = this.$route.params.movieid
      const reviewData = {
        review: this.review,
        rate: this.rate
      }
      axios({
        method:'post',
        url:`${API_URL}/movies/${movieId}/review/`,
        headers:{
          Authorization:`Token ${this.token}`
        },
        data: reviewData,
      })
      .then(()=>{
        this.closeModal()
        this.getMovieDetail()
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/review.scss";

.review-list-container {
  height: 778px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  background-color: rgba(0,0,0,0.2);
}

.review-list-container::-webkit-scrollbar {
  width: 0;
  background-color: transparent;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
}

</style>