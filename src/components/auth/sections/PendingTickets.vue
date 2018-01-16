<template>
  <div style="width:100%">
      <div class="animated fadeIn" v-if="pendingTicketWait">
        <div class=" col-12 mb-3 text-center" >
         <img class="loader-img" src="static/img/loader.gif" alt="">
       </div>
     </div>
      <div v-else-if="pendingTickets.length > 0" class="col-12 mb-3 animated slideInUp" >
        <hr>
        <h3>Ανοιχτά Αιτήματα</h3>

            <app-pendingticket
              v-for="pendingTicket in pendingTickets"
              :category="pendingTicket.ticket_category"
              :ticket_id="pendingTicket.ticket_id"
              :description="pendingTicket.ticket_description"
              :time="pendingTicket.ticket_created_at"
              :auto-update="15">
            </app-pendingticket>

    </div>

    </div>
</template>

<script>
import VueTimeago from 'vue-timeago'
import PendingTicket from './singleTickets/PendingTicket'

export default {
  components: {
      'app-pendingticket': PendingTicket,
    },

  data () {
    return {
      pendingTickets: [],
      pendingTicketWait: true
    }
  },
  created () {
    this.getPendingTickets()
  },
  methods: {
    getPendingTickets () {
      window.axios.defaults.headers.common = {
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + this.$store.state.userStore.authUser.access_token
        };

        const user_id = this.$store.state.userStore.authUser.user_id



      axios.get(API.getPendingTickets+'/'+user_id)
      .then( response => {
        this.pendingTickets = response.data.pending_tickets
      })
      .catch( error => {
        console.log(error.response.data);
          if(error.response.status == 401)
            this.$router.push({name: 'Login'})
      })

    }
  },
  watch: {
    pendingTickets () {
      this.pendingTicketWait = false;
    }
  }
}
</script>

<style scoped>
  img{
    width: 64px;
  }

  .card-text{
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: .75rem 1.25rem;
  }
</style>
