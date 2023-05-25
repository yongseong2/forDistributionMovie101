<template>
  
  <div v-if="videoId">
    <h4 class="mb-2">예고편</h4>
    <hr>
    <iframe width="100%" height="350px" :src="videoURL" frameborder="0"></iframe>
  </div>


</template>

<script>
import axios from 'axios'
// const API_URL = 'http://127.0.0.1:8000'
const API_URL = 'http://movie101.site:8000'


export default {
  name:'YoutubeContent',
  data() {
    return {
      videoId: null,
    }
  },
  props:{

  },
  created() {
    this.searchVideo()
  },
  computed: {
    videoURL() {
      return `https://www.youtube.com/embed/${this.videoId}/`
      // return `https://www.youtube.com/embed/xWvqWi2i82E`
    }
  },
  methods: {
    searchVideo() {

      axios({
        method:'get',
        url: `${API_URL}/movies/${this.$route.params.movieid}/`
      })
      .then(res=>{
        const videokeyString = res.data.video_key
        const videokeyArray = videokeyString.slice(1, -1).split(", ")
        const firstVideo = videokeyArray[0].replace(/'/g, ""); // 따옴표 제거
        this.videoId = firstVideo
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }

}
</script>

<style>

</style>