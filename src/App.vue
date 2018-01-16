<template>
  <div id="app">
    <app-navigation></app-navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapState} from 'Vuex'
export default {
  name: 'app',
  computed: {
    ...mapState ({
      userStore: state => state.userStore
    })
  },
  created () {
  console.log('Created App')
  const userObj = JSON.parse(window.localStorage.getItem('authUser'))
  this.$store.dispatch('setUserObject', userObj)
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
opacity: 0
}
</style>
