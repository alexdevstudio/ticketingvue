<template>
  <div class="card pending-tickets tickets-list mb-2 "  >
      <h4 class="card-header alert alert-warning">
        {{categorySlug(category)}}  <small>(#{{ticket_id}})</small> <small class="small-date pull-right warning-color">{{completedDate (time)}}</small>
      </h4>
          <div class="card-block pb-0 pt-1">
            <div class="">
              Εγώ: <span class="reply-time">{{completedDate (time)}}</span>
            </div>
            <p class="card-text mb-3 reply my-reply">{{description}}</p>
          </div>
          <div class="card-footer text-muted">
            <div class="row">
              <div class="col-6">
                <button
                type="button"
                class="pointer btn btn-xs btn-outline-secondary">
                <router-link  :to="{path: '/reply/' + ticket_id}"   ><i class="fa fa-eye" aria-hidden="true"></i> Προβολή / Απάντηση</router-link>
              </button>
                <!-- <button type="button" @click="solvedPrompt(true)" class="pointer btn btn-outline-success"><i class="fa fa-check" aria-hidden="true"></i> Mark as Solved</button> -->

              </div>
              <div class="col-6 pt-2 text-right pull-right">
                <timeago class="" :since="time"></timeago>
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
  </div>
</template>

<script>

export default {

  props: ['category', 'ticket_id', 'description', 'time'],
  data () {
    return {
      solvedShow : false
    }
  },
  methods: {
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
    }
    // solvedPrompt (value) {
    //   this.solvedShow = value
    // }
  }
}
</script>
