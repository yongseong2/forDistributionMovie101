<template>
  <div>
    <ul>
      <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :token="token"
        @comment-deleted="getComments"
        @comment-updated="getComments"
      />
    </ul>
    <input v-model.trim="newComment" type="text">
    <button @click="createComment" class="btn btn-outline-light">댓글 작성</button>
  </div>
</template>

<script>
import axios from 'axios'
import CommentItem from './CommentItem.vue'
// const API_URL = 'http://127.0.0.1:8000'
const API_URL = 'http://movie101.site:8000'

export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  data() {
    return {
      comments: [],
      newComment: '',
    }
  },
  computed: {
    token() {
      return this.$store.state.token
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    getComments() {
      axios({
        method: 'get',
        url: `${API_URL}/community/${this.$route.params.id}/`,
        headers: {
          Authorization: `Token ${this.token}`
        }
      })
        .then(res => {
          const comments = res.data.comment_set
          this.comments = comments
        })
        .catch(err => {
          console.log(err)
        })
    },
    createComment(){
      if (this.newComment === '') {
        alert('댓글을 작성해주세요.')
        return
      }

      axios({
        method:'post',
        url:`${API_URL}/community/${this.$route.params.id}/comments/`,
        data:{
          content: this.newComment
        },
        headers: {
          Authorization: `Token ${this.token}`
        }

      })
      .then(()=>{
        alert('댓글을 작성하였습니다.')
        this.newComment = ''
        this.getComments()
      })
      .catch((err)=>{
        console.log(err)
        alert('잘못된접근입니다.')


      })

    }
  }
}
</script>

<style>

</style>
