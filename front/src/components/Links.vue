<template lang="html">
  <div class="links">
    <h2>Links</h2>
    <div v-if="isLoading">
      <img class="img_state" src="src/assets/loader.gif" alt="">
      <strong>Loading links...</strong>
    </div>
    <div v-else-if="isError">
        <img class="img_state" src="src/assets/error.png" alt=""><br>
        <strong>Server error :'(</strong>
    </div> 
    <ul v-else>
      <li v-for="link in links" v-if="link">
        <a target="_blank" :href="link">
          <i class="fa fa-link" aria-hidden="true"></i>
          {{link}}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import env from 'env'

  export default {
    name: 'links',
    data() {
      return {
        isLoading: true,
        isError: false,
        links: [],
      }
    },
    mounted() {
      fetch(`${env.api}/links`)
        .then(resp => resp.json())
        .then(data => {
          this.links = data
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false;
          this.isError = true;
        })
    },
    sockets: {
      links: function (links) {
        this.links = links
      }
    },
  }
</script>

<style lang="scss" scoped>
  .links {
    margin-top: 60px;
    li {
      a {
        display: inline-flex;
        flex-direction: column;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #2c3e50;
        text-decoration: none;
        margin: 20px;
        i {
          font-size: 3em;
          transition: all 0.2s;
        }
        &:hover i{
          transform: scale(0.9)
        }
      }
    }
  }

  h2 {
    background: #42b983;
    margin: 0px 20px;
    color: white;
  }

  .img_state {
    height: 100px;
    margin-top: 20px;
  }
</style>
