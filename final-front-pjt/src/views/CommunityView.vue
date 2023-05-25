<template>
  <div id="Article">
    <ArticleList/>
  </div>
</template>

<script>
import ArticleList from '@/components/Article/ArticleList.vue'

export default {
  name:'CommunityView',
  components: {
    ArticleList
  }
}
</script>

<style scoped>
#Article {
  background-color: rgb(26, 25, 25);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: whitesmoke
}
</style>