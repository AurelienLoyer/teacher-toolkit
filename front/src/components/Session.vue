<template lang="html">
  <div class="session">
    <h1>{{infos.formation}}</h1>
    <h2>
      <i class="fa fa-link" aria-hidden="true"></i>
      {{url}}
    </h2>
    <div class="teacher">
      <div class="avatar" style="background-image:url('src/assets/avatar.jpg')"></div>
      <h2 class="infos">
        {{infos.who}}
        <br>
        <a :href="`mailto:${infos.email}`">{{infos.email}}</a>
      </h2>
      <ul class="social">
        <li v-if="infos.github">
          <a :href="`https://github.com/${infos.github}`">
            <i class="fa fa-github" aria-hidden="true"></i>
            {{infos.github}}
          </a>
        </li>
        <li v-if="infos.twitter">
            <a :href="`https://twitter.com/${infos.twitter}`">
              <i class="fa fa-twitter" aria-hidden="true"></i>
              {{infos.twitter}}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import env from 'env'
  import File from './File.vue'

  export default {
    name: 'files',
    data() {
      return {
        infos: {},
        url: window.location.origin,
      }
    },
    components: {
    },
    created() {
      this.$http.get(env.api + '/infos').then(response => {
        this.infos = response.body
      })
    },
    methods: {
    },

  }
</script>

<style lang="scss">
  .session {
    padding: 1px;

    h1 {
      background: #42b983;
      color: white;
      margin: 0px;
      padding: 10px;
    }

    .avatar {
      border-radius: 50%;
      height: 100px;
      width: 100px;
      margin: auto;
      background-size: cover;
      background-position: center;
    }

    .social{
      a{
        text-decoration: none;
        display: flex;
        align-items: center;
        i{
          font-size: 2em;
          margin-right: 5px;
        }
      }
    }
  }
</style>
