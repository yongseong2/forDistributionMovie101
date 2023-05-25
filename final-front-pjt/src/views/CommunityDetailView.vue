<template>
  <div class="container mt-5">
    <h1>상세 페이지</h1>
    <div class="card">
      <div class="card-header">
        <h3>제목: {{ articleDetail?.title }}</h3>
        <router-link :to="{ name: 'ProfileView', params: { username: articleDetail?.username } }">작성자: {{ articleDetail?.username }}</router-link>
      </div>
      <div class="card-body">
        <p>내용: {{ articleDetail?.content }}</p>
      </div>
      <div class="card-footer">
        <p>작성 시간: {{ formatDateTime(articleDetail?.created_at) }}</p>
      </div>
    </div>
      <p>댓글 수: {{ articleDetail?.comment_count }}</p>
      <p>댓글목록</p>
      <CommentList/>
      <!-- <router-link :to="{name:'CommunityCreateView'}" class="btn btn-outline-light">게시글 작성</router-link> -->
      <router-link class="btn btn-outline-light" :to="{ name: 'CommunityView' }">
        목록으로
      </router-link>
      <router-link v-if="articleDetail?.is_mine" class="btn btn-outline-light" :to="{ name: 'CommuityUpdateView' }">
        수정
      </router-link>
      <button v-if="articleDetail?.is_mine" class="btn btn-outline-light" @click="deleteArticle">게시물 삭제</button>
  </div>

</template>

<script>
import CommentList from '@/components/Article/CommentList.vue'
import axios from 'axios'
// const API_URL = 'http://127.0.0.1:8000'
const API_URL = 'http://movie101.site:8000'

export default {
  name: 'CommunityDetailView',
  components:{
    CommentList
  },
  data(){
    return {
      articleDetail: null,
    }
  },
  created(){
    this.getDetail()

  },
  computed: {
    token() {
      return this.$store.state.token
    },
  },
  methods: {
    getDetail() {
      axios({
        method:'get',
        url:`${API_URL}/community/${this.$route.params.id}/`,
        headers: {
          Authorization : `Token ${this.token}`
        }

      })
      .then(res=>{
        this.articleDetail = res.data
      })
      .catch(err=>{
        alert('로그인이 필요한 서비스입니다.')
        console.log(err)
        this.$router.push({name:'LoginView'})
      })
    },
    formatDateTime(datetime) {
        const dateObj = new Date(datetime)
        const year = dateObj.getFullYear()
        const month = String(dateObj.getMonth() + 1).padStart(2, '0')
        const day = String(dateObj.getDate()).padStart(2, '0')
        const hours = String(dateObj.getHours()).padStart(2, '0')
        const minutes = String(dateObj.getMinutes()).padStart(2, '0')
        
        return `${year}/${month}/${day} ${hours}:${minutes}`
    },
    deleteArticle() {
      axios({
        method:'delete',
        url:`${API_URL}/community/${this.$route.params.id}/`,
        headers: {
          Authorization: `Token ${this.token}`
        }
      })
      .then(()=>{
        alert('게시물이 삭제되었습니다.')
        this.$router.push({ name: 'CommunityView' })
      })
      .catch((err)=>{
        console.log(err)
      })
    },
  }
}
</script>

<style>

</style>