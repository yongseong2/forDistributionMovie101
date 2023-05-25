<template>
  <div class="container mt-5" id="articlelist">
    <h1>영화 토론 게시판</h1>
    <div class="row">
    <div class="col-lg-12">
        <div class="card">
            <div class="card-body bg-dark">
                <div class="table-responsive project-list">
                      <table class="table table-dark table-hover project-table table-centered table-nowrap">
                        <thead>
                            <tr >
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">작성자</th>
                                <th scope="col" class=justify-content-end>작성 시간</th>
                            </tr>
                        </thead>
                            <ArticleListItem
                            v-for="article in paginatedArticles"
                            :key = article.id
                            :article = article
                            />
                  </table>
                </div>
            </div>
        </div>
      </div>
    </div>
    <router-link :to="{name:'CommunityCreateView'}" class="btn btn-outline-light">게시글 작성</router-link>
    <PageNation
    :currentPage="currentPage" 
    :totalPages="totalPages" 
    @pageChanged="changePage"
    />

  </div>
</template>

<script>
import ArticleListItem from '@/components/Article/ArticleListItem.vue'
import PageNation from '@/components/Article/PageNation'

export default {
  name:'ArticleList',
  components: {
    ArticleListItem,
    PageNation,
  },
  data() {
    return {
      articleList: [],
      currentPage: 1,
      itemsPerPage: 10
    }
  },
  created() {
    this.getArticles()
  },
  methods: {
    getArticles() {
      this.$store.dispatch('getArticles')
    },
    changePage(page) {
      this.currentPage = page
    },

  },
  computed: {
    articles() {
      return this.$store.state.articleList
    },
    username() {
      return this.$store.state.username
    },
    paginatedArticles() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      const endIndex = startIndex + this.itemsPerPage
      return this.articles.slice(startIndex, endIndex)
    },
    totalPages() {
      return Math.ceil(this.articles.length / this.itemsPerPage)
    },
  },

}
</script>

<style>

.card {
    border: none;
    margin-bottom: 24px;
    -webkit-box-shadow: 0 0 13px 0 rgba(236,236,241,.44);
    box-shadow: 0 0 13px 0 rgba(68, 68, 68, 0.44);
}

#articlelist{
  background-color: rgb(26, 25, 25);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: whitesmoke
}

</style>