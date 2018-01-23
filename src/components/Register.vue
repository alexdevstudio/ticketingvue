<template>
  <div class="container">
    <div class="row">
      <div class=" col-md-6 offset-md-3" >
        <div class="card mt-3">
          <transition name="fade" v-if="!registrationComplete">
             <div class="card-body" >
            <form @submit.prevent="register()">
              <h3 class="text-center">Εγγραφή Νέου Χρήστη</h3>
              <hr>
              <div class="form-group" >
                <label class="h5 " for="name">Όνομα</label>
                <input type="text" class="form-control" id="name" placeholder="Όνομα" v-model="user.user_first_name">
                <p class="help-block" :class="{'text-danger' : errors.user_first_name}" v-if="errors.user_first_name">{{ errors.user_first_name[0] }}</p>
              </div>
              <div class="form-group" >
                <label class="h5 " for="user_last_name">Επώνυμο</label>
                <input type="text" class="form-control" id="user_last_name" placeholder="Επώνυμο" v-model="user.user_last_name">
                <p class="help-block" :class="{'text-danger' : errors.user_last_name}" v-if="errors.user_last_name">{{ errors.user_last_name[0] }}</p>
              </div>
              <div class="form-group" >
                <label class="h5 " for="user_geo_location">Γεωγραφικό Σημείο</label>
                <select @change="getFloors()" class="form-control" id="user_geo_location" name="user_geo_location" v-model="user.user_geo_location" >
                  <option  selected value="">Επιλέξτε Γεωγραφικό Σημείο</option>
                  <option  v-for="(location) in geoLocations"  :value="location.address_id">
                    {{location.eponimia}}
                  </option>
                </select>
                <p class="help-block" :class="{'text-danger' : errors.user_geo_location}" v-if="errors.user_geo_location">{{ errors.user_geo_location[0] }}</p>
              </div>
              <div class="form-group" >
                <label class="h5 " for="user_floor">Όροφος</label>
                <select  class="form-control" id="user_floor" name="user_floor" v-model="user.user_floor" >
                  <option  selected value="">Επιλέξτε τον όροφο</option>
                  <option  v-for="(floor) in floors"  :value="floor.floor_id">
                    {{floor.floor_floor}}
                  </option>
                </select>
                <p class="help-block" :class="{'text-danger' : errors.user_floor}" v-if="errors.user_floor">{{ errors.user_floor[0] }}</p>
              </div>
              <div class="form-group" >
                <label class="h5 " for="user_office">Γραφείο</label>
                <select  class="form-control" id="user_office" name="user_office" v-model="user.user_office" >
                  <option  selected value="">Επιλέξτε το γραφείο</option>
                  <option  v-for="(office) in offices"  :value="office.office_id">
                    {{office.office_name}}
                  </option>
                </select>
                <p class="help-block" :class="{'text-danger' : errors.user_office}" v-if="errors.user_office">{{ errors.user_office[0] }}</p>
              </div>

              <div class="form-group" >
                <label class="h5 " for="user_telephone">Αριθμός Τηλεφώνου</label>
                <input type="text" class="form-control" id="user_telephone" placeholder="Αριθμός Τηλεφώνου" v-model="user.user_telephone">
                <p class="help-block" :class="{'text-danger' : errors.user_telephone}" v-if="errors.user_telephone">{{ errors.user_telephone[0] }}</p>
              </div>
              <hr>
              <div class="form-group" >
                <label class="h5 " for="user_email">Ηλ. Διεύθυνση</label>
                <input type="text" class="form-control" id="user_email" placeholder="Ηλ. Διεύθυνση" v-model="user.user_email">
                <p class="help-block" :class="{'text-danger' : errors.user_email}" v-if="errors.user_email">{{ errors.user_email[0] }}</p>
              </div>
              <div class="form-group" >
                <label class="h5 " for="user_password">Κωδικός</label>
                <input type="password" class="form-control" id="user_password" placeholder="Κωδικός" v-model="user.user_password">
                <p class="help-block" :class="{'text-danger' : errors.user_password}" v-if="errors.user_password">{{ errors.user_password[0] }}</p>
              </div>
              <div class="form-group" >
                <label class="h5 " for="user_password_confirmation">Επαλήθευση Κωδικού</label>
                <input type="password" class="form-control" id="user_password_confirmation" placeholder="Επαλήθευση Κωδικού" v-model="user.user_password_confirmation">
                <p class="help-block" :class="{'text-danger' : errors.user_password_confirmation}" v-if="errors.user_password_confirmation">{{ errors.user_password_confirmation[0] }}</p>
              </div>

              <div class="text-center">
                <button type="submit" :disabled="!registrationButton" class="btn btn-primary" id="register" name="button" >Εγγραφή</button>
              </div>
              </form>
          </div>
          </transition>
          <transition name="fade" v-else>
          <div class="card-body" >
            <h3 class="text-center">Παρακαλώ Ενεργοποπιήστε Τον Λογαρισμό σας</h3>
            <hr>
            <p>Ευχαριστούμε, {{user.user_first_name}}!</p>
              <p>Η εγγραφή έχει σχεδών ολοκληρωθεί.
                Ελέξτε το Email σας και πατήστε στο κουμπί ενεργοποίησης του λογαριασμού.</p>
              <p>Το Email Έχει σταλεί στη διεύθυνση {{user.user_email}}.</p>
          </div>
          </transition>
        </div>


        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
      return {
        user: {
          user_first_name: '',
          user_last_name: '',
          user_geo_location: '',
          user_office: '',
          user_floor: '',
          user_telephone: '',
          user_email: '',
          user_password: '',
          user_password_confirmation: ''
        },
        geoLocations: [],
        floors: [],
        offices: [],
        errors: {},
        registrationComplete: false,
        registrationButton: true,


      }
    },
    watch: {

    },
    created () {
      this.getGeoLocations()
    },
    methods: {
      getOffices () {
        var geo_loc_id = this.user.user_geo_location

        if(geo_loc_id === '')
        return false



        axios.get(API.offices + '/' + geo_loc_id)
        .then( response => {
          this.offices = response.data.offices
          console.log(this.floors);
        })
        .catch( error => {
          console.log(error.response.data);
        })
    },
      getFloors () {
        //this.user.user_geo_location
        var geo_loc_id = this.user.user_geo_location

        if(geo_loc_id === '')
        return false

        axios.get(API.floors + '/' + geo_loc_id)
        .then( response => {
          this.floors = response.data.floors

          this.getOffices()

        })
        .catch( error => {
          console.log(error.response.data);
        })
      },
      getGeoLocations () {
        axios.get(API.geo_locations)
        .then( response => {
          this.geoLocations = response.data.addresses

        })
        .catch( error => {
          console.log(error.response.data);
        })

      },
      register () {
        this.registrationButton = false
        //Reset Errors
        this.errors = {};
        axios.post(API.register, this.user)
        .then( response => {
          this.registrationComplete = true

        })
        .catch( error => {
          //console.log(error.response.data);
        this.errors = error.response.data.errors
          //console.log(this.errors);
        })
        this.registrationButton = true
      }
    }
}
</script>
<style scoped>

</style>
