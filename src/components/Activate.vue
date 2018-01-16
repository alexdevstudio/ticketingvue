<template>
  <div class="container">
    <div class="row">
      <div class=" col-md-6 offset-md-3">
        <div class="card mt-3">
          <div class="card-body text-center">
            <transition name="fade" class=""  v-if="activated">
              <div class="">
                <h3>Activation Completed.</h3>
                <p>Your account is active. Please login with your credentials</p>
                <p class="lead">
                  <router-link  :to="{name: 'Login'}" class="btn btn-primary btn-md">Login</router-link>
                </p>
              </div>
            </transition>
            <transition  name="fade" class="" v-else>
            <h3>Activating User...</h3>
          </transition>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  props: ['user_activation_code'],
  data () {
    return {
      activated: false
    }
  },
  created() {
    //do something after creating vue instance
    this.activate();
  },
  methods: {
    activate() {

      axios.post(API.activate, this.$route.params)
      .then( response => {
       // Reset user fields
       this.activated = true;
        console.log(response);
      })
      .catch( error => {
        //console.log(this.errors);
        this.errors = error.response.data
        console.log(this.errors);
      })
    }
  }
}
</script>
