<template>
  <li>
    <div v-if="!isEditing">{{ comment.content }}</div>
    <div v-if="isEditing"><input type="text" v-model="updatedContent"></div>
    <div>작성자: {{ comment.username }}</div>
    <div>작성 시간: {{ formatDateTime(comment.created_at) }}</div>

    <button v-if="is_mine && !isEditing" @click="deleteComment">Delete</button>
    <button v-if="is_mine && !isEditing" @click="editComment">Edit</button>
    <button v-if="is_mine && isEditing" @click="updateComment">Save</button>
  </li>
</template>

<script>
import axios from 'axios';
// const API_URL = 'http://127.0.0.1:8000';
const API_URL = 'http://movie101.site:8000'

export default {
  name: 'CommentItem',
  data() {
    return {
      is_mine: null,
      isEditing: false,
      updatedContent: ''
    };
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    token: {
      type: String,
      required: true
    },
  },
  created() {
    this.isCommentMine();
  },
  methods: {
    deleteComment() {
      axios({
        method: 'delete',
        url: `${API_URL}/community/comments/${this.comment.id}/`,
        headers: {
          Authorization: `Token ${this.token}`
        }
      })
        .then(() => {
          // Comment successfully deleted, update the list of comments
          this.$emit('comment-deleted');
        })
        .catch(err => {
          console.log(err);
        });
    },
    isCommentMine() {
      axios({
        method: 'get',
        url: `${API_URL}/community/comments/${this.comment.id}/`,
        headers: {
          Authorization: `Token ${this.token}`
        }
      })
        .then((res) => {
          this.is_mine = res.data.is_mine;
        });
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
    editComment() {
      this.isEditing = true;
      this.updatedContent = this.comment.content;
    },
    updateComment() {
      if (this.updatedContent===''){
        alert('내용을 작성해주세요.')
        return
      }

      axios({
        method: 'put',
        url: `${API_URL}/community/comments/${this.comment.id}/`,
        headers: {
          Authorization: `Token ${this.token}`
        },
        data: {
          content: this.updatedContent
        }
      })
        .then(() => {
          this.isEditing = false;
          this.$emit('comment-updated', this.comment.id, this.updatedContent);
        })
        .catch(err => {
          console.log(err);
        });
    },
  }
}
</script>

<style>

</style>
