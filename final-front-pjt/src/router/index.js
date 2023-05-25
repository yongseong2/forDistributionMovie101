import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import MainView from '@/views/MainView'
import TodayMovieView from '@/views/TodayMovieView'
import MoviesView from '@/views/MoviesView'
import CommunityView from '@/views/CommunityView'
import ProfileView from '@/views/ProfileView'
import LoginView from '@/views/LoginView'
import CommunityDetailView from '@/views/CommunityDetailView'
import SignUpView from '@/views/SignUpView'
import CommuityUpdateView from '@/views/CommuityUpdateView'
import CommunityCreateView from '@/views/CommunityCreateView'
import MovieDetailView from '@/views/MovieDetailView'
import SearchView from '@/views/SearchView'
import ChangePassWordView from '@/views/ChangePassWordView'
import MovieChallengeView from '@/views/MovieChallengeView'
import ActorsChallengeView from '@/views/ActorsChallengeView'


import NotFound404 from '@/views/NotFound404'






Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainView',
    component: MainView
  },
  {
    path: '/todaysmovie',
    name: 'TodayMovieView',
    component: TodayMovieView
  },
  {
    path: '/movies',
    name: 'MoviesView',
    component: MoviesView
  },
  {
    path: '/community',
    name: 'CommunityView',
    component: CommunityView
  },
  {
    path: '/community/:id',
    name: 'CommunityDetailView',
    component: CommunityDetailView
  },
  {
    path: '/profile/:username',
    name: 'ProfileView',
    component: ProfileView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },
  {
    path: '/update/:id',
    name: 'CommuityUpdateView',
    component: CommuityUpdateView
  },
  {
    path: '/create',
    name: 'CommunityCreateView',
    component: CommunityCreateView
  },
  {
    path: '/movie/:movieid',
    name: 'MovieDetailView',
    component: MovieDetailView
  },
  {
    path: '/search/:searchdata',
    name: 'SearchView',
    component: SearchView
  },
  {
    path: '/changepassword/:username',
    name: 'ChangePassWordView',
    component: ChangePassWordView
  },
  {
    path: '/moviechallenge',
    name: 'MovieChallengeView',
    component: MovieChallengeView
  },
  {
    path: '/actorchallenge',
    name: 'ActorsChallengeView',
    component: ActorsChallengeView
  },
  {
    path: '*',
    name: 'NotFound404',
    component: NotFound404
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 로그인 후에 들어갈 필요가 없는 페이지
router.beforeEach((to, from, next)=> {
  const isLoggedIn = store.getters.isLogin
  if (isLoggedIn && (
    to.name === 'LoginView' || 
    to.name === 'SignUpView'
    )) {
    next({ name: 'MainView' })
  } else {
    next()
  }
})

// 로그인 후에 들어갈 수 있는 페이지
router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters.isLogin;
  const requiresAuth = [
    'TodayMovieView',
    'MoviesView',
    'CommunityView',
    'CommunityDetailView',
    'ProfileView',
    'CommuityUpdateView',
    'SearchView',
    'ChangePassWordView',
    'MovieDetailView',
    'MovieChallengeView',
    'ActorChallengeView',
  ];

  if (requiresAuth.includes(to.name) && !isLoggedIn) {
    // 로그인이 필요한 페이지에 접근 시
    alert('로그인이 필요한 서비스입니다.');
    next({ name: 'LoginView' }); // 로그인 페이지로 이동
  } else {
    next();
  }
});

export default router
