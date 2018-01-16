<template>
  <div class="card completed-tickets tickets-list mb-2 "  >
      <h4 class="card-header alert alert-info">
        {{categorySlug(category)}}  <small>(#{{ticket_id}})</small> <small class="small-date pull-right info-color">{{completedDate (time)}}</small>
      </h4>
          <div class="card-block pb-0 pt-1 completed-tickets">
            <div class="text-muted">
            <strong>Αρχική περιγραφή του αιτήματος:</strong> <span class="reply-time">{{completedDate (time)}}</span>
            </div>
            <p class="card-text issue-description">{{description}}</p>
              <div class=" alert alert-info">
                <p>{{outcome}}</p>
                <hr>
                <div class="row">
                  <div  class="col-6 mb-0" >
                    <strong>Τεχνικός:</strong> {{technician}}
                  </div>
                  <div  class="col-6 pull-right text-right mb-0" >

                  </div>
                </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            <div class="row">
              <div class="col-6">
                <button type="button" class="pointer btn btn-xs btn-outline-secondary">
                    <router-link  :to="{path: '/view/' + ticket_id}"   ><i class="fa fa-eye" aria-hidden="true"></i> Προβολή</router-link>
                  </button>
                </div>
                <div class="col-6 pt-2 text-right pull-right">
                  <span>Έκλεισε το αίτημα: {{completedDate(completed_date)}}</span>
                </div>
              </div>
            </div>
          </div>
</template>

<script>

export default {

  props: ['ticket_id', 'category', 'description', 'outcome', 'time', 'completed_date', 'technician'],
  data () {
    return {
    }
  },
  methods: {
    completedDate (date) {
      var t = date.split(/[- :]/);
      var d = new Date(Date.UTC(t[0], t[1], t[2], t[3], t[4]));
      return t[3] + ":" + t[4] + " " + " " + t[2] + "-" + t[1] + "-" + t[0]
    },
    categorySlug (category) {
      if(category == 'Telecommunications')
        return 'Τηλέφωνα / ΦΑΞ';
      else if (category == 'computing')
        return 'Desktops / Laptops';
      else if (category == 'printing')
        return 'Εκυπωτές / Copiers';
      else if (category == 'dbs')
        return 'Βάσεις Δεδομένων';
    }
  }
}
</script>
<style scoped>
  .card-footer{
    border-top: none;
  }
  .issue-description {
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: .75rem 1.25rem;
}
</style>
