<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mb-3">
        <h3 class="mt-3"><small>Υποβολή Νέου Αιτήματος Με Θέμα:</small> {{categorySlug (category)}}</h3>
      </div>

      <div class="col-12 mt-3 pb-2  pt-3  bg-grey animated fadeIn">
        <span v-if="categories.length > 0" class="animated fadeIn">
          <p class="lead">Επιλέξτε Κατηγορίες <span class="text-danger">*</span>:</p>
            <div class="col-12 white-bg pt-3 pb-0 mb-2 radius4">
              <div class="row">
                <div v-for="cat in categories" class="col-12 col-sm-6">
                  <div class="form-group">
                  <label  class="custom-control custom-checkbox">
                    <input type="checkbox"  :value="cat.id" v-model="selectedCategories" class="custom-control-input">
                    <span class="custom-control-indicator"></span>
                    <span class="custom-control-description">{{cat.name}}</span>
                  </label>
                </div>
                </div>
              </div>
            </div>
            </span>
            <p class="lead">Προσθέστε Σχόλιο <small class=" ">(προαιρετικό)</small>:</p>

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
      errors: false,
      categories: [],
      selectedCategories: []
    }
  },

  methods: {
    getCategories () {
      axios.get(API.ticketCategories + '/' + this.category )
      .then( response => {
        this.categories = response.data.categories
      })
      .catch( error => {
          this.errors = error.response.data.errors
          this.submitAllow = true
          this.activeDescription = true
      })
    },
    submitTicket () {
      this.errors = ''
      this.submitAllow = false
      this.activeDescription = false
      const ticket = {
      ticket_user_id: this.$store.state.userStore.authUser.user_id,
      ticket_category: this.category,
      ticket_description: this.description,
      ticket_selected_categories: JSON.stringify(this.selectedCategories)

      }

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
    selectedCategories: function  (selectedCategories) {
      if(selectedCategories.length < 1)
        this.submitAllow = false
      else
        this.submitAllow = true

    },
    activeDescription () {
      if(!this.activeDescription)
      this.submitBtnValue = "Υποβάλεται..."
      else
      this.submitBtnValue = "Υποβολή"
    }
  },
  created () {
    window.axios.defaults.headers.common = {
      'Accept' : 'application/json',
      'Authorization' : 'Bearer ' + this.$store.state.userStore.authUser.access_token
      };
    this.category = this.$route.params.category
    this.getCategories();
  }
}
</script>
