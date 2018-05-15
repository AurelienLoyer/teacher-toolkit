<template lang="html">
  <div class="session">
    <h1>{{infos.formation}}</h1>
    <router-link v-if="!isError" class="button" to="admin">Top Secret</router-link>
    <h2>
      <i class="fa fa-link" aria-hidden="true"></i>
      {{url}}
    </h2>
    <div class="teacher">
      <div class="avatar" style="background-image:url('src/assets/avatar.jpg'); display:none;"></div>
      <h2 class="infos">
        {{infos.who}}
        <br>
        <a :href="`mailto:${infos.email}`">{{infos.email}}</a>
      </h2>
      <ul class="social">
        <li v-if="infos.github">
          <a target="_blank" :href="`https://github.com/${infos.github}`">
            <i class="fa fa-github" aria-hidden="true"></i>
            {{infos.github}}
          </a>
        </li>
        <li v-if="infos.twitter">
          <a target="_blank" :href="`https://twitter.com/${infos.twitter}`">
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
        isError: false,
      }
    },
    components: {
    },
    created() {
      this.$http.get(env.api + '/infos')
        .then(response => {
          this.infos = response.body
          this.isError = false
        })
        .catch(() => {
          this.isError = true
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
      background: var(--main-theme-color);
      color: white;
      margin: 0px;
      padding: 10px;
    }

    .button {
      position: absolute;
      background: white;
      text-decoration: none;
      font-weight: bold;
      padding: 10px;
      top: 14px;
      font-size: 12px;
      border-left: solid 30px var(--main-theme-color);
      transition: all 0.2s;
      right: -80px;
      &:hover {
        right: 0px;
      }
    }

    .avatar {
      border-radius: 50%;
      height: 100px;
      width: 100px;
      margin: auto;
      background-size: cover;
      background-position: center;
    }

    .social {
      a {
        text-decoration: none;
        display: flex;
        align-items: center;
        i {
          font-size: 2em;
          margin-right: 5px;
        }
      }
    }
  }
</style>
