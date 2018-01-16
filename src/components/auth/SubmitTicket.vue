<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mb-3">
        <h3 class="mt-3">Υποβολή Νέου Αιτήματος</h3>
      </div>

      <div class="col-12 mt-3 pb-2  pt-3  bg-grey animated fadeIn">
          <h4>Με Θέμα: {{categorySlug (category)}}</h4>

          <form @submit.prevent="submitTicket()">
            <div class="form-group">
              <textarea placeholder="Περιγραφή του προβλήματος..." :disabled="!activeDescription == 1 ? true : false" class="form-control" id="exampleTextarea" rows="3" v-model="description"></textarea>
            </div>
            <p v-if="errors" class="alert alert-danger" v-for="error in errors">{{error[0]}}</p>
            <router-link  :to="{name: 'Dashboard'}"   class="btn pull-left btn-outline-secondary">Πίσω</router-link>
            <input type="submit" :disabled="!submitAllow == 1 ? true : false"  class="btn  pull-right btn-success text-white" v-model="submitBtnValue" />
            <div class="clearfix"></div>
          </form>
      </div>
    </div>
  </div>

</template>

<script>
import {mapState} from 'Vuex'
export default {
  props: [],
  data () {
    return {
      category: '',
      description: '',
      submitAllow: false,
      submitBtnValue: 'Υποβολή',
      activeDescription: true,
      errors: false
    }
  },

  methods: {
    submitTicket () {
      this.errors = ''
      this.submitAllow = false
      this.activeDescription = false
      const ticket = {
      ticket_user_id: this.$store.state.userStore.authUser.user_id,
      ticket_category: this.category,
      ticket_description: this.description
      }
      window.axios.defaults.headers.common = {
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + this.$store.state.userStore.authUser.access_token
        };
      axios.post(API.submitTicket, ticket)
      .then( response => {
        this.$store.dispatch('setFlashMsg', 'Το  νέο Ticket έχει καταχωρηθεί με επιτυχία.')
        this.$router.push({name: 'Dashboard'})
      })
      .catch( error => {
          this.errors = error.response.data.errors
          this.submitAllow = true
          this.activeDescription = true
      })

    },
    categorySlug (category) {
      if(category == 'telecommunications')
        return 'Τηλέφωνα / ΦΑΞ';
      else if (category == 'computing')
        return 'Desktops / Laptops';
      else if (category == 'printing')
        return 'Εκυπωτές / Copiers';
      else if (category == 'dbs')
        return 'Βάσεις Δεδομένων';
    }
  },
  computed: {
    ...mapState ({
      msg: state => state.msg
    })
  },
  watch: {
    description: function  (query) {
      if(query.length < 20)
        this.submitAllow = false
      else
        this.submitAllow = true

    },
    activeDescription () {
      if(!this.activeDescription)
      this.submitBtnValue = "Υποβάλεται..."
    }
  },
  created () {
    this.category = this.$route.params.category
  }
}
</script>
