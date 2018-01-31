<template>
  <nav class="navbar sticky-top navbar-expand-lg  navbar-dark bg-dark ">
    <div class="container">
    <router-link  :to="{name: 'Home'}" class="navbar-brand"><img src="/static/img/logo.png" alt="" class=" center-block"></router-link>
    <button class="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
       <ul class="navbar-nav mr-auto" v-if="userStore.authUser !== null && userStore.authUser.access_token">
        <li class="nav-item">
          <router-link  :to="{name: 'Dashboard'}"   class="nav-link">Πίνακας Ελέγχου</router-link>
        </li>
      </ul>
      <ul class="navbar-nav pull-right text-right" v-if="userStore.authUser !== null && userStore.authUser.access_token">
        <!-- <li class="nav-item "><router-link  :to="{name: 'Settings'}"   class="nav-link">Ρυθμίσεις</router-link></li> -->
        <li class="nav-item ">
          <a href="#"  @click.prevent="logout"  class="nav-link">Αποσύνδεση</a>
        </li>
      </ul>
      <ul class="navbar-nav mr-auto" v-else>
        <li class="nav-item">
          <router-link  :to="{name: 'Login'}"   class="nav-link">Είσοδος</router-link>
        </li>
        <li class="nav-item">
          <router-link  :to="{name: 'Register'}"   class="nav-link">Εγγραφή</router-link>
        </li>
      </ul>

     </div>
    </div>
  </nav>
</template>

<script>
import {mapState} from 'Vuex'
  export default {
    computed: {
      ...mapState({
        userStore: state => state.userStore
      })
    },
    methods: {
      logout () {
        this.$store.dispatch('clearAuthUser')
        window.localStorage.removeItem('authUser')
        this.$router.push({name: 'Home'})
      }
    }
  }
</script>
