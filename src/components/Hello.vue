<template>
  <div id="Hello">
    <h3> Counter is: {{ this.$store.state.count }}, and it is {{ evenOrOdd }}</h3>
    <button type="button" name="button" @click="increment">+</button>
    <button type="button" name="button" @click="decrement">-</button>
    <button type="button" name="button" @click="incrementIfOdd">incrementIfOdd</button>
    <button type="button" name="button" @click="incrementAsync">incrementAsync</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: mapGetters ([
    'evenOrOdd'
  ]),
  methods: mapActions([
    'increment',
    'decrement',
    'incrementIfOdd',
    'incrementAsync'
  ])
}
</script>
