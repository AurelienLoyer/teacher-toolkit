<template lang="html">
  <div class="links" v-if="links.length">
    <h2>Links</h2>
    <ul class="">
      <li v-for="link in links">
        {{link}}
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
        links: [],
      }
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
  }

  h2 {
    background: #42b983;
    margin: 0px 20px;
    color: white;
  }
</style>
