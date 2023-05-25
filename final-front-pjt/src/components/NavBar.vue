<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark " data-bs-theme="dark">
      <div class="container-fluid">
        <router-link :to="{name:'MainView'}" class="navbar-brand" href="#">
          <img src="@/assets/Logo_final.png" alt="Bootstrap" width="189" height="36">
        </router-link>
        
        <form class="d-flex" role="search" @submit.prevent="goToSearch">
          <input v-model.trim="searchData" class="form-control me-2" type="search" placeholder="영화제목을 입력하세요" aria-label="Search">
          <button class="btn btn-outline-light" type="submit">Search</button>
        </form>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link :class="{'nav-link': true, 'active': $route.name === 'CommunityView'}" :to="{name:'CommunityView'}">COMMUNITY</router-link>
            </li>
            <li v-if="!isLogin"><router-link :class="{'nav-link': true, 'active': $route.name === 'LoginView'}" :to="{name:'LoginView'}">LOGIN</router-link></li>
            <li v-if="!isLogin"><router-link :class="{'nav-link': true, 'active': $route.name === 'SignUpView'}" :to="{name:'SignUpView'}">SIGNUP</router-link></li>
            <li class="nav-item dropdown">
              <a v-if="isLogin" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                ACCOUNT
              </a>
              <ul class="dropdown-menu">
                <li v-if="isLogin">
                  <router-link :class="{'nav-link': true, 'active': $route.name === 'ProfileView'}" :to="{ name: 'ProfileView', params: { username: loginedUserName } }">MY PROFILE</router-link>
                </li>

                <li v-if="!isLogin"><router-link :class="{'nav-link': true, 'active': $route.name === 'LoginView'}" :to="{name:'LoginView'}">LOGIN</router-link></li>                <li v-if="!isLogin"><router-link :class="{'nav-link': true, 'active': $route.name === 'SignUpView'}" :to="{name:'SignUpView'}">SIGNUP</router-link></li>
                

                <li v-if="isLogin" @click="logOut"><p :class="{'nav-link': true, 'active': logOut}">LOGOUT</p></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

    </nav>
</template>

<script>
export default {
  name:'NavBar',
  data() {
    return {
      searchData: '',
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('logOut')
    },
    goToSearch() {
      if (this.searchData === '') {
        alert('영화제목을 입력하세요.')
        return
      }


      this.$router.push({
        name:'SearchView', 
        params:{searchdata:this.searchData}
        })
        .catch(()=> {
        })
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
    loginedUserName() {
      return this.$store.state.loginedUserName
    }
  }
}
</script>

<style>

</style>