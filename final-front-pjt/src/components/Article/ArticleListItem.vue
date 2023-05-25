<template>
    <tbody>
        <tr>
            <th scope="row">{{article.id}}</th>
            <td @click='goToDetail(article.id)'>{{article.title}}</td>
            <td><router-link :to="{ name: 'ProfileView', params: { username: article.username } }">{{article.username}}</router-link></td>
            <td>{{formatDateTime(article.created_at)}}</td>
        </tr>
    </tbody>
</template>

<script>
export default {
    name:'ArticleListItem',
    props: {
        article: Object,
    },
    methods: {
        formatDateTime(datetime) {
        const dateObj = new Date(datetime)
        const year = dateObj.getFullYear()
        const month = String(dateObj.getMonth() + 1).padStart(2, '0')
        const day = String(dateObj.getDate()).padStart(2, '0')
        const hours = String(dateObj.getHours()).padStart(2, '0')
        const minutes = String(dateObj.getMinutes()).padStart(2, '0')
        
        return `${year}/${month}/${day} ${hours}:${minutes}`
        },
        goToDetail(articleId) {
            this.$router.push({ name: 'CommunityDetailView', params: { id: articleId } })
        },
    }
}
</script>

<style>

</style>