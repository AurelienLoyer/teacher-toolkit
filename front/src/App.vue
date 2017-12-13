<template>
  <div id="app">
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>

  import Footer from './components/Footer.vue'

  export default {
    name: 'app',
    data() {
      return {}
    },
    components: {
      'v-footer': Footer,
    },
  }
</script>

<style lang="scss">
  html,
  body {
    padding: 0;
    margin: 0;
    overflow-x: hidden;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-bottom: 30px;
  }

  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
