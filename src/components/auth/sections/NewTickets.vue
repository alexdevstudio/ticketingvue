<template>
  <div class=" col-12 animated fadeIn">
    <div class="row"  v-if="!showForm">
    <div class="col-md-3 col-12 mb-2">
      <div class="card" >
        <div class="text-center pt-2">
          <img src="static/img/desktop.png" alt="">
        </div>
        <div class="card-block">
          <h4 class="card-title">Desktop / Laptops</h4>
          <p class="card-text">Τεχνική υποστήριξη σε θέματα Η/Υ, Laptop, προβλημάτων δικτύου, κλπ...</p>
          <router-link  :to="{path: '/submit-ticket/computing'}"   class="btn btn-primary text-white cursor">Νέο Αίτημα</router-link>
        </div>
      </div>
    </div>
    <div class="col-md-3 col-12 mb-2">
      <div class="card" >
        <div class="text-center pt-2">
          <img src="static/img/telephone.png" alt="">
        </div>
        <div class="card-block">
          <h4 class="card-title">Τηλέφωνα / ΦΑΞ</h4>
          <p class="card-text">Τεχνική υποστήριξη σε θέματα εσωτερικών τηλεφώνων, ΦΑΞ, γραμμών ΟΤΕ, κλπ...</p>
          <router-link  :to="{path: '/submit-ticket/telecommunications'}"   class="btn btn-primary text-white cursor">Νέο Αίτημα</router-link>
        </div>
      </div>
    </div>
    <div class="col-md-3 col-12 mb-2">
      <div class="card" >
        <div class="text-center pt-2">
          <img src="static/img/printer.png" alt="">
        </div>
        <div class="card-block">
          <h4 class="card-title">Εκυπωτές / Copiers</h4>
          <p class="card-text">Τεχνική υποστήριξη σε θέματα εκτυπώσεων, scanner, φωτοτυπικών, κλπ...</p>
          <router-link  :to="{path: '/submit-ticket/printing'}"   class="btn btn-primary text-white cursor">Νέο Αίτημα</router-link>
        </div>
      </div>
    </div>
    <div class="col-md-3 col-12 mb-2">
      <div class="card" >
        <div class="text-center pt-2">
          <img src="static/img/databases.png" alt="">
        </div>
        <div class="card-block">
          <h4 class="card-title">Βάσεις Δεδομένων</h4>
          <p class="card-text">Τεχνική υποστήριξη ERP και άλλων βάσεων δεδομένων κλπ...</p>
          <router-link  :to="{path: '/submit-ticket/dbs'}"   class="btn btn-primary text-white cursor">Νέο Αίτημα</router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="col-12 mt-3 pb-2  pt-3 bg-grey animated fadeIn" v-if="showForm">
      <h4>Νέο Αίτημα: {{category}}</h4>
      <form @submit.prevent="submitTicket()">
        <div class="form-group">
          <label for="exampleTextarea">Περιγραφή βλάβης</label>
          <textarea
            :disabled="!activeDescription == 1 ? true : false"
            class="form-control" id="exampleTextarea"
            rows="3"
            v-model="description"></textarea>
        </div>
        <p
          v-if="errors"
          class="alert alert-danger"
          v-for="error in errors">{{error[0]}}</p>
        <button
          type="button"
          @click.prevent="cancelTicket()"
          class="btn pull-left btn-outline-secondary ">Άκυρο</button>
        <button
          type="submit"
          :disabled="!submitAllow == 1 ? true : false"
          class="btn  pull-right btn-success text-white">{{submitBtnValue}}</button>
        <div class="clearfix"></div>
      </form>
  </div>
</div>
</template>

<script>
export default {
  props: [],
  data () {
    return {
      category: '',
      description: '',
      showForm: false,
      submitAllow: false,
      submitBtnValue: 'Υποβολή',
      activeDescription: true,
      errors: false
    }
  },
  methods: {
    submitTicket () {
      this.errors = ''
      this.submittnValue = 'Υποβάλεται...'
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
        this.showForm = false
        this.description = ''
        this.submittnValue = 'Υποβολή'
        this.submitAllow = false
        this.activeDescription = true
      })
      .catch( error => {
          this.errors = error.response.data.errors
          this.submittnValue = 'Υποβολή'
          this.submitAllow = true
          this.activeDescription = true
      })

    },
    chooseCat (cat) {
      this.showForm = true
      this.category = cat
    },
    cancelTicket () {
      this.showForm = false
      this.activeDescription = true
      this.submitAllow = false
      this.submittnValue = 'Υποβολή'
    }
  },
  watch: {
    description: function  (query) {
      if(query.length < 20)
        this.submitAllow = false
      else
        this.submitAllow = true

    }
  }
}
</script>
