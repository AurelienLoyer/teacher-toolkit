<template lang="html">
  <div class="session">
    <h1>{{infos.formation}}</h1>
    <h2>{{url}}</h2>
    <div class="teacher">
      <h2>
        {{infos.who}}<br>
        {{infos.teacher}}
      </h2>
    </div>
  </div>
</template>

<script>
import env from 'env'
import File from './File.vue'

export default {
  name: 'files',
  data () {
    return {
      infos: {},
      url: window.location.origin,
    }
  },
  components: {
  },
  created(){
    this.$http.get(env.api+'/infos').then(response => {
      this.infos = response.body
    })
  },

}
</script>

<style lang="css">
</style>
