<template lang="html">
<div class="files">
  <h2>Files</h2>
  <ul class="">
    <li v-for="file in files">
      <v-file :file="file"></v-file>
    </li>
  </ul>
</div>
</template>

<script>
import env from 'env'
import File from './File.vue'

export default {
  name: 'files',
  data () {
    return {
      files: [],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    'v-file':File,
  },
  sockets:{
    files: function(files){
      this.files = files
    }
  },
}
</script>

<style lang="css">
</style>
