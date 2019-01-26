<template>
  <div id="app">
    <link rel="stylesheet" :href="`${api_url}/theme.css`">
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>

import Footer from './components/Footer.vue';

export default {
  name: 'app',
  data() {
    return {
      api_url: `${process.env.VUE_APP_API_URL}`,
    };
  },
  components: {
    'v-footer': Footer,
  },
  sockets: {
    reload() {
      document.location.reload();
    },
  },
};
</script>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
  color: var(--main-theme-color);
}
</style>
