<template lang="html">
<div class="files">
  <h2>Files</h2>
  <img v-if="isLoading" class="loader" src="https://cdn.dribbble.com/users/215249/screenshots/2575539/octo-loader.gif" alt="">
  <ul v-else>
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
      isLoading: true,
      files: [],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    fetch(`${env.api}/files`)
      .then(resp => resp.json())
      .then(data => {
        this.files = data
        this.isLoading = false;
      })
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

    .loader {
      height: 100px;
      margin-top: 20px;
    }

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
