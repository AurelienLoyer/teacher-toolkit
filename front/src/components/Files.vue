<template lang="html">
  <div class="files">
    <h2>Files</h2>

    <v-loader :type="'files'" v-if="isLoading"></v-loader>

    <v-error v-else-if="isError"></v-error>
    
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
  import Error from './Error.vue'
  import Loader from './Loader.vue'
 
  export default {
    name: 'files',
    components: {
      'v-file': File,
      'v-loader': Loader,
      'v-error': Error,
    },
    data() {
      return {
        isLoading: true,
        isError: false,
        files: [],
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted() {
      fetch(`${env.api}/files`)
        .then(resp => resp.json())
        .then(data => {
            this.files = data
            this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.isError = true;
        })
    },
    sockets: {
      files: function (files) {
        this.files = files
      }
    },
  }
</script>

<style lang="scss" scoped>
  .files {
    margin-top: 20px;

    .img_state {
      height: 100px;
      margin-top: 20px;
    }

    ul {
      padding-top: 30px;
    }
  }

  h2 {
    background: #42b983;
    margin: 0px 20px;
    color: white;
  }
</style>
