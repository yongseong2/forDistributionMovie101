<template>
  <div class="container mt-5">
    <h1>토론 작성 페이지</h1>
    <div class="card">
      <div class="card-header">
        <input v-model.trim="title" class="form-control" type="text" placeholder="제목"/>
      </div>
      <div class="card-body">
        <textarea v-model.trim="content" class="form-control" rows="5" placeholder="내용"></textarea>
      </div>
      <div class="card-footer">
        <button class="btn btn-success" @click="createArticle">작성</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// const API_URL = 'http://127.0.0.1:8000'
const API_URL = 'http://movie101.site:8000'

export default {
  name:'CommunityCreateView',
  data() {
    return {
      title: '',
      content: '',
    }
  },
  computed: {
    token() {
      return this.$store.state.token
    }

  },
  methods: {
    createArticle(){
      if (this.title === '') {
        alert('제목을 작성해주세요.')
        return
      }
      else if (this.content === '') {
        alert('내용을 작성해주세요.')
        return
      }
      const payload = {
        title: this.title,
        content: this.content
      }
      axios({
        method: 'post',
        url: `${API_URL}/community/`,
        data: payload,
        headers: {
          Authorization: `Token ${this.token}`
        }
      })
      .then(()=>{
        alert('게시글을 작성하였습니다.')
        this.$router.push({name:'CommunityView'})
      })
      .catch((err)=>{
        console.log(err)
        alert('잘못된 접근입니다.')
      })
    }
  }

}
</script>

<style>

</style>