<template>
<div class="login-box">
    <h2>Change Password</h2>
    <form @submit.prevent="changePassWord">
      <div class="user-box">
        <input type="password" name="" required="" v-model.trim="password1">
        <label>Password</label>
      </div>
      <div class="user-box">
        <input type="password" name="" required="" v-model.trim="password2">
        <label>Password confirmation</label>
      </div>
      <div class="button-container">
        <button 
        style="
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        ">
          <a href="#" @click="changePassWord" class="submit-button">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </a>
        </button>
      </div>
    </form>
  </div>
</template>

<script>

import axios from 'axios'
// const API_URL = 'http://127.0.0.1:8000'
const API_URL = 'http://movie101.site:8000'
export default {
  name:'ChangePassWordView',
  computed: {
    token() {
      return this.$store.state.token
    }
  },
  data() {
    return {
      password1: null,
      password2: null,
    }
  },
  methods:{
    changePassWord() {
      axios({
        method:'post',
        url: `${API_URL}/accounts/password/change/`,
        data: {
          new_password1: this.password1,
          new_password2: this.password2,
        },
        headers: {
          Authorization: `Token ${this.token}`
        }
      })
      .then(res=>{
        console.log(res)
        alert('비밀번호가 변경되었습니다. 다시 로그인 해주세요')
        this.logOut()
      })
      .catch(err=>{
        console.log(err)
      })
    },
    logOut() {
      this.$store.dispatch('logOut')
    }
  }

}
</script>

<style scoped>

html {
  height: 100%;
}
body {
  margin:0;
  padding:0;
  font-family: sans-serif;
  background: linear-gradient(#141e30, #243b55);
}

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0,0,0,.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top:0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: rgb(203, 229, 231);
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: rgb(203, 229, 231);
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px
}

.login-box a:hover {
  background: rgb(203, 229, 231);
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px rgb(203, 229, 231),
              0 0 25px rgb(203, 229, 231),
              0 0 50px rgb(203, 229, 231),
              0 0 100px rgb(203, 229, 231);
}

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgb(203, 229, 231));
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, white);
  animation: btn-anim2 1s linear infinite;
  animation-delay: .25s
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,100% {
    top: 100%;
  }
}

.login-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, white);
  animation: btn-anim3 1s linear infinite;
  animation-delay: .5s
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,100% {
    right: 100%;
  }
}

.login-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, white);
  animation: btn-anim4 1s linear infinite;
  animation-delay: .75s
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,100% {
    bottom: 100%;
  }
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.submit-button {
  margin-bottom: 20px;
}


</style>