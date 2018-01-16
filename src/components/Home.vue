<template>
  <div class="container mt-3">
      <div class="jumbotron">
        <h1 class="display-4">Καλωσήρθατε στο E-Support!</h1>
        <p class="lead mt-3">
          Παρακαλώ <strong>Συνδεθείτε</strong> αν ήδη έχετε λογαριασμό ή κάντε <strong>Εγγραφή</strong> για να δημιουργήσετε νέο.
        </p>
        <hr class="my-4">
        <p class="lead">
          <router-link  :to="{name: 'Login'}" class="btn btn-primary btn-md">Σύνδεση</router-link>
          <router-link  :to="{name: 'Register'}" class="btn  btn-outline-primary btn-md">Εγγραφή</router-link>
        </p>
      </div>
    </div>
</template>

<script>
export default {

}
</script>
