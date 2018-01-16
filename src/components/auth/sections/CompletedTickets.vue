<template>
  <div style="width:100%">

      <div v-if="completdTickets.length > 0" class="col-12 mb-3 animated slideInUp" >
        <hr>
        <h3>Ολοκληρωμένα Αιτήματα</h3>
            <app-completedticket
              v-for="completedTicket in completdTickets"
              :category="completedTicket.ticket_category"
              :ticket_id="completedTicket.ticket_id"
              :description="completedTicket.ticket_description"
              :outcome="completedTicket.ticket_outcome"
              :time="completedTicket.ticket_created_at"
              :completed_date="completedTicket.ticket_completed_at"
              :technician="completedTicket.first_name + ' ' + completedTicket.last_name"
              :auto-update="15">
            </app-completedticket>

      </div>
    </div>

</template>

<script>
import VueTimeago from 'vue-timeago'
import CompletedTicket from './singleTickets/CompletedTicket'

export default {
  components: {
      'app-completedticket': CompletedTicket,
    },

  data () {
    return {
      completdTickets: [],
      completedTicketWait: true
    }
  },
  created () {
    this.getCompletedTickets()
  },
  methods: {
    getCompletedTickets () {


        const user_id = this.$store.state.userStore.authUser.user_id



      axios.get(API.getCompletedTickets+'/'+user_id)
      .then( response => {
        this.completdTickets = response.data.completed_tickets
      })
      .catch( error => {
        console.log(error.response.data);
          if(error.response.status == 401)
            this.$router.push({name: 'Login'})
      })

    }
  },
  watch: {
    completdTickets () {
      this.completedTicketWait = false;
    }
  }
}
</script>

<style scoped>
  img{
    width: 64px;
  }
</style>
