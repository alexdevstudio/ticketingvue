<template>
  <div class="container">
    <div class="row">
      <div class=" col-md-6 offset-md-3">
        <div class="card mt-3">
          <div class="card-body">
            <form @submit.prevent="login()">
              <h3 class="text-center">Είσοδος</h3>
              <hr>

              <div class="form-group" >
                <label class="h5 " for="user_email">Email</label>
                <input type="text" class="form-control" id="user_email" placeholder="Your Email" v-model="user.user_email">
              </div>
              <div class="form-group" >
                <label class="h5 " for="user_password">Κωδικός</label>
                <input type="password" class="form-control" id="user_password" placeholder="Your Password" v-model="user.user_password">
              </div>

              <div class="text-center">
                <div  v-if="!logging">
                  <p class="help-block text-danger" v-if="error">{{ error }}</p>
                  <button type="submit" class="btn btn-primary" id="login" name="button" >Είσοδος</button>
                </div>
                  <div  v-else>
                <img class="loader-img" src="static/img/loader.gif" alt="">
              </div>
              </div>
              </form>
          </div>
        </div>


        </div>
    </div>
</div>
</template>

<script>
import {mapState} from 'Vuex'
import {clientId, clientSecret} from '../env'
export default {
    data() {
      return {
        user: {

            user_email: 'alex@bluecdf.gr',
            user_password: ''
        },
        logging: false,
        error: false
      }
    },
    computed: {
      ...mapState ({
        userStore: state => state.userStore
      })
    },
    methods: {
      login () {
        this.logging = true
        const postData = {
          grant_type: 'password',
          client_id: clientId,
          client_secret: clientSecret,
          username: this.user.user_email,
          password: this.user.user_password,
          scope: ''
        }
        //Reset Errors
        this.error = false;
        const authUser = {}
        axios.post(API.login, postData)
        .then( response => {

          if(response.status === 200){
            console.log(response.data.access_token);
            authUser.access_token = response.data.access_token
            authUser.refresh_token = response.data.refresh_token

            window.axios.defaults.headers.common = {
              'Accept' : 'application/json',
              'Authorization' : 'Bearer ' + response.data.access_token
              };

              axios.get(API.userData)
                .then( response => {
                  authUser.user_email = response.data.user_email
                  authUser.user_first_name = response.data.user_first_name
                  authUser.user_last_name = response.data.user_last_name
                  authUser.user_full_name = response.data.user_first_name + ' ' + response.data.user_last_name
                  authUser.user_id = response.data.user_id
                  window.localStorage.setItem('authUser', JSON.stringify(authUser));
                  this.$store.dispatch('setUserObject', authUser)
                  this.$router.push({name: 'Dashboard'})
                  this.logging = false

                })
                .catch( error => {
                  this.logging = false
                })
                //Store user information to local storage
          }
        })
        .catch( error => {

          if(error.response.status == 401)
            this.error = error.response.data.message
          else
            this.error = error.response.data.hint
          this.logging = false
        })

      }
    }
}
</script>
