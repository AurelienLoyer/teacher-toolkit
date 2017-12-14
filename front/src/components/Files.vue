<template lang="html">
  <div class="files">
    <h2>Files</h2>
    <div v-if="isLoading">
      <img class="img_state" src="src/assets/loader.gif" alt=""><br>
      <strong>Loading files...</strong>
    </div>
    <div v-else-if="isError">
      <img class="img_state" src="src/assets/error.png" alt="">
      <br>
      <strong>Server error :'(</strong>
    </div>
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
    components: {
      'v-file': File,
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
