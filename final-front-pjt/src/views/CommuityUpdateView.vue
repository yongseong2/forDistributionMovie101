<template>
  <div class="container mt-5">
    <h1>수정 페이지</h1>
    <div class="card">
      <div class="card-header">
        <input v-model.trim="updatedTitle" class="form-control" type="text" placeholder="제목" />
        <p>작성자: {{ articleDetail?.username }}</p>
      </div>
      <div class="card-body">
        <textarea v-model.trim="updatedContent" class="form-control" rows="5" placeholder="내용"></textarea>
      </div>
      <div class="card-footer">
        <button class="btn btn-success" @click="updateArticle">수정 완료</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// const API_URL = 'http://127.0.0.1:8000'
const API_URL = 'http://movie101.site:8000'

export default {
  name: 'CommunityUpdateView',
  data() {
    return {
      articleDetail: null,
      updatedTitle: '',
      updatedContent: ''
    }
  },
  created() {
    this.getDetail()
  },
  computed: {
    token() {
      return this.$store.state.token
    }  
  },
  methods: {
    getDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/community/${this.$route.params.id}/`
      })
        .then(res => {
          this.articleDetail = res.data
          this.updatedTitle = this.articleDetail.title
          this.updatedContent = this.articleDetail.content
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateArticle() {
      const payload = {
        title: this.updatedTitle,
        content: this.updatedContent
      }

      axios({
        method: 'put',
        url: `${API_URL}/community/${this.$route.params.id}/`,
        data: payload,
        headers: {
          Authorization: `Token ${this.token}`
        }
      })
        .then(() => {
          alert('게시물이 수정되었습니다.')
          this.$router.push({ name: 'CommunityView' })
        })
        .catch((err) => {
          console.log(err)
          alert('잘못된 접근입니다.')
        })
    }
  }
}
</script>

<style>

</style>
