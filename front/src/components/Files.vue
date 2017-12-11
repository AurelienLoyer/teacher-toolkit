<template lang="html">
<div class="files">
  <h2>Files</h2>
  <ul class="">
    <li v-for="file in files" v-if="files.length">
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

<style lang="scss" scoped>
  .files {
    margin-top: 20px;

    ul{
      padding-top: 30px;
    }
  }
  h2{
    background: #42b983;
    margin: 0px 20px;
    color: white;
  }
</style>
