<template>
  <div class="container  open-ticket pb-3">
    <div class="row ticket-true animated fadeIn" v-if="ticket">
      <div class="col-12 mb-3">
        <h3 class="mt-3">Ανοιχτό Αίτημα</h3>
      </div>
      <div class="col-12">
      <div class="card open-ticket  pending-tickets tickets-list mb-2 "  >
          <h4 class="card-header alert mb-0 alert-warning">
            Με θέμα: {{categorySlug (category)}}  <small>(#{{ticket_id}})</small> <small class="small-date pull-right warning-color">Δημιουργήθηκε {{ completedDate(time) }}</small>
          </h4>
          <div class="ticket-description" >

            <p class="initial-reply fs-large card-text mb-3 reply my-reply">Περιγραφή: <br>{{ description }}</p>
          </div>
              <div class="card-block pb-0 pt-1">

                <div class="replies animated fadeIn" v-if="replies" v-for="reply in replies">
                  <div class="row">
                    <div v-if="reply.ticket_reply_author_category == 'employee'" class="col-8 ">
                      <strong>Εγώ:</strong>
                      <p class="card-text mb-3 reply my-reply">{{ reply.ticket_reply_text }}<br><span  class=" reply-time">{{ completedDate(reply.ticket_reply_created_at) }}</span> </p>
                    </div>
                    <div v-else class="offset-sm-4 col-8 float-right ">
                      <strong><span class="technician-name" >{{reply.first_name}} {{reply.last_name}}</span>:</strong>
                      <p class="techincian-reply card-text mb-3 reply my-reply">{{ reply.ticket_reply_text }}
                        <br>
                        <span  class="pull-right reply-time">{{ completedDate(reply.ticket_reply_created_at) }}</span>
                        <br>
                     </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer" v-if="!closed">
                <div class="row">
                  <div class="col-12">
                      <textarea
                      rows="4"
                      class="w100 reply-textarea"
                      v-model="ticket_reply_text"
                      :disabled="!activeDescription == 1 ? true : false"></textarea>
                  </div>
                  <div class="alert w100 alert-danger" v-if="error">
                    {{error}}
                  </div>
                  <div class="col-6">
                    <button type="button" @click="submitReply()" :disabled="!submitAllow == 1 ? true : false" class="pointer btn btn-xs pull-left btn-outline-primary">
                      <i class="fa fa-reply" aria-hidden="true"></i> {{submitBtnValue}}
                    </button>

                  </div>
                  <div class="col-6 text-right pull-right">
                    <button type="button" class="pointer btn btn-xs btn-outline-secondary">
                      <router-link  :to="{name: 'Dashboard'}"   >
                        <i class="fa fa-arrow-left" aria-hidden="true"></i> Πίσω στον Πίνακα Ελέγχου
                      </router-link>
                    </button>
                  </div>

                </div>
                <!-- <div class="row" v-if="solvedShow">
                  <hr>
                  <div class="solved-confirm col-12 text-center" >

                    Are sure you want to mark this issue as solved?
                    <button type="button" class="pointer btn btn-success">Yes</button>
                    <button type="button" @click="solvedPrompt(false)" class="pointer btn btn-danger">No</button>
                  </div>
                </div> -->
              </div>
              <div v-else class="card-footer">
                <div class="row">
                  <div class="col-12 text-right pull-right">
                    <button type="button" class="pointer btn btn-xs btn-outline-secondary">
                      <router-link  :to="{name: 'Dashboard'}"   >
                        <i class="fa fa-arrow-left" aria-hidden="true"></i> Πίσω στον Πίνακα Ελέγχου
                      </router-link>
                    </button>
                  </div>
                </div>
              </div>
      </div>
    </div>
</div>
<div v-else class="row text-center">
  <div class="animated fadeIn col-12" >
    <div class=" col-12 mb-3 text-center" >
     <img class="loader-img" src="/static/img/loader.gif" alt="">
   </div>
 </div>
  <!-- <div class="col-12 text-center alert alert-danger mt-3">
    {{error}} <br>
    <router-link  :to="{path: '/reply/' + ticket_id}"   ><i class="fa fa-globe" aria-hidden="true"></i> Go To Dashboard</router-link>

  </div> -->
</div>
</div>
</template>

<script>

export default {


  data () {
    return {
      ticket: false,
      ticket_id : '',
      time: false,
      timeToShow: false,
      category: '',
      description: '',
      error: false,
      replies: [],
      ticket_reply_text: '',
      submitAllow: false,
      closed: true,
      submitBtnValue: 'Αποστολή',
      activeDescription: true,
    }
  },
  methods: {
    getTicket (ticket_id) {

      this.ticket_id = ticket_id
      const user_id = this.$store.state.userStore.authUser.user_id

      axios.get(API.getTicket+'/'+ticket_id)
      .then( response => {
        this.description = response.data.ticket.ticket_description
        this.category = response.data.ticket.ticket_category
        this.time = response.data.ticket.ticket_created_at
        var closed = response.data.ticket.ticket_status;


        if(closed != 0)
          this.$router.push({path: 'view/' + ticket_id})
        else
          this.closed = false

        this.replies = response.data.replies
        this.ticket = true

      })
      .catch( error => {
        if(error.response.status == 401){
            this.$router.push({name: 'Dashboard'})
        }else{
          this.error = error.response.data.message
          this.ticket = false
        }
      })
    },
    submitReply () {
      this.error = false;
      this.submitAllow = false
      this.activeDescription = false

       const  postData = {
          ticket_reply_text: this.ticket_reply_text,
          ticket_reply_ticket_id: this.$route.params.ticket_id
        }
        axios.post(API.postReply, postData)
        .then( response => {
          this.ticket_reply_text = ''
          this.replies.push(response.data.reply)
          this.activeDescription = true
          this.submitAllow = true

        })
        .catch( error => {
          this.error = error.response.data.message
          this.activeDescription = true
          this.submitAllow = true

        })
    },
    completedDate (date) {
        var t = date.split(/[- :]/);
        var d = new Date(Date.UTC(t[0], t[1], t[2], t[3], t[4]));
        return t[3] + ":" + t[4] + " " + " " + t[2] + "-" + t[1] + "-" + t[0]


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
    },
    // solvedPrompt (value) {
    //   this.solvedShow = value
    // }
  },
  watch: {
    time () {
      if(!this.time)
      return false

      this.ticket = true
    },
    ticket_reply_text () {
      if(this.ticket_reply_text.length > 5)
        this.submitAllow = true
      else
        this.submitAllow = false

    },
    replies () {
      setTimeout(function () {window.scrollTo(0,document.body.scrollHeight)}, 100)
    },
    activeDescription () {
      if(this.activeDescription)
        this.submitBtnValue = 'Αποστολή'
      else
        this.submitBtnValue = 'αποστέλεται...'
    }
  },
  created () {
    window.axios.defaults.headers.common = {
      'Accept' : 'application/json',
      'Authorization' : 'Bearer ' + this.$store.state.userStore.authUser.access_token
      };
    this.getTicket(this.$route.params.ticket_id)

  }
}
</script>
