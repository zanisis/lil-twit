<template lang="html">
<div class="container">
  <nav class="nav">
    <div class="nav-left">
      <a href="/" class="nav-item is-brand">
        <img src="https://blog.gnip.com/wp-content/uploads/2012/02/logo_twitter_withbird_1000_allblue32.png" alt="Suportted by bulma">
      </a>
    </div>
    <span id="nav-toggle" class="nav-toggle">
      <span></span>
      <span></span>
      <span></span>
    </span>
    <div class="nav-right nav-menu">
      <div class="nav-item">
        <div class="field is-grouped">
          <p v-if="hasLogin" class="" @click="logout">
            <a class="button is-warning">
              <span class="icon">
                <i class="fa fa-sign-out"></i>
              </span>
              <span>Log Out</span>
            </a>
          </p>
          <p v-if="!hasLogin" class="control" @click="login">
            <a href="#" class="button is-primary">
              <span class="icon">
                <i class="fa fa-sign-in"></i>
              </span>
              <span>Login</span>
            </a>
          </p>
          <p v-if="!hasLogin" class="control" @click="register">
            <a href="#" class="button is-info">
              <span class="icon">
                <i class="fa fa-pencil"></i>
              </span>
              <span>Register</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </nav>

  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-content" id="modalRegis">
      <div class="box">
        <label class="label title">Register</label>
        <hr>
        <div class="field">
          <p class="control">
            <label class="label">Username</label>
            <input v-model="username" class="input is-hovered" type="text" placeholder="Username">
          </p>
        </div>
        <div class="field">
          <p class="control">
            <label class="label">Password</label>
            <input v-model="password" class="input is-hovered" type="password" placeholder="Password">
          </p>
        </div>
        <div v-if="forLogin === false" class="field">
          <p class="control">
            <label class="label">Email</label>
            <input v-model="email" class="input is-hovered" type="password" placeholder="example@gmail.com">
          </p>
        </div>
        <hr>
        <p class="control">
          <button v-if="!forLogin" class="button is-primary" @click="submitRegister">Register</button>
          <button v-if="forLogin" class="button is-primary" @click="submitLogin">Login</button>
          <button class="button " @click="cancelRegisterAndLogin">Cancel</button>
        </p>
      </div>
    </div>
    <!-- <button class="modal-close"></button> -->
  </div>
</div>
</template>

<script>
export default {
  data(){
    return {
      hasLogin : false,
      forLogin : false,
      username : '',
      password : '',
      email : ''
    }
  },
  computed : {
    userLogin(){
      return this.$store.state.hasUser
    }
  },
  methods :{
    register(){
      $('.modal').addClass('is-active')
    },
    submitRegister(){
      this.$store.dispatch('register', this)
      $('.modal').removeClass('is-active')
    },
    cancelRegisterAndLogin(){
      this.username = ''
      this.password = ''
      this.email = ''
      $('.modal').removeClass('is-active')
    },
    login(){
      this.forLogin = true
      $('.modal').addClass('is-active')
    },
    submitLogin(){
      this.$store.dispatch('login', this)
      this.username = ''
      this.password = ''
      $('.modal').removeClass('is-active')
      location.reload()
    },
    logout(){
      localStorage.clear();
      location.reload();
    }
  },
  created(){
    console.log('ada ga',localStorage.getItem('token'));
    if(localStorage.getItem('token')){
      this.$store.dispatch('checkToken', localStorage.getItem('token'))
      this.hasLogin = true
      console.log(this);
    }
  }
}
</script>

<style lang="css">
#modalRegis{
  width: 33%;
}
</style>
