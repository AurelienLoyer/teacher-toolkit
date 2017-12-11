<template lang="html">
  <div class="home">
    <v-session></v-session>
    <v-files></v-files>
    <v-links></v-links>
  </div>
</template>

<script>
import env from 'env'
import Files from './Files.vue'
import Links from './Links.vue'
import Session from './Session.vue'

export default {
  name: 'home',
  data () {
    return {
    }
  },
  components: {
    'v-files':Files,
    'v-links':Links,
    'v-session':Session,
  },
  sockets:{
  },
}
</script>

<style lang="css">
</style>
