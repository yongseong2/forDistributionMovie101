<template>
  <div class="pt-3" id="pagenation">
    <ul class="pagination justify-content-end mb-0">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" tabindex="-1" aria-disabled="true" @click="changePage(currentPage - 1)">Previous</a>
      </li>
      <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
        <a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="#" @click="changePage(currentPage + 1)">Next</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'PageNation',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('pageChanged', page);
      }
    }
  }
}
</script>

<style>

</style>
