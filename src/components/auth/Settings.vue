<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mb-3">
        <h3 class="mt-3">Ρυθμίσεις</h3>
      </div>
      <app-newtickets></app-newtickets>
      <div class="col-12 mt-3"  v-if="msg">
        <p class="alert alert-success">{{msg}}</p>
      </div>
      <!-- <app-pendingtickets></app-pendingtickets>
      <app-completedtickets></app-completedtickets> -->
</div>
</div>
</template>

<script>
//Components
import NewTickets from './sections/NewTickets'
import PendingTickets from './sections/PendingTickets'
import CompletedTickets from './sections/CompletedTickets'
//Components end

export default {
  components: {
    'app-newtickets': NewTickets,
    'app-pendingtickets': PendingTickets,
    'app-completedtickets': CompletedTickets,
  },
  data () {
    return {

    }
  },
   created() {
     window.axios.defaults.headers.common = {
       'Accept' : 'application/json',
       'Authorization' : 'Bearer ' + this.$store.state.userStore.authUser.access_token
       };

    this.clearMsg()
  },
  computed: {
    user () {
      return this.$store.state.userStore.authUser
    },
    msg () {
      return  this.$store.state.msg.flash;
    }
  },
  methods: {
    clearMsg () {
      setTimeout(function () {
        this.$store.dispatch('clearFlashMsg')
      }.bind(this), 5000);
    }
  }
}
</script>
