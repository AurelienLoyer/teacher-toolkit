<template lang="html">
    <a class="file" :href="env.api +'/files/'+file">
      <img :src="getIconByType(file)" alt="">
      <span>{{file}}</span>
    </a>
</template>

<script>

import env from 'env'

export default {
  name: 'file',
  data () {
    return {
      env:env
    }
  },
  components: {
  },
  props: [
    'file'
  ],
  created(){
  },
  methods:{
    getIconByType(type){
      return 'src/assets/icons/archive.png'
    }
  }
}
</script>

<style scoped lang="scss">

.file{
  text-decoration: none;
  padding: 10px;
  &:hover{
    img{
      transform: scale(0.9);
    }
    span{
      transform: scale(1.1);
    }
  }
  img{
    transition: all 0.2s;
    height: 100px;
    display: block;
  }
  span{
    transition: all 0.2s;
    padding: 10px;
    display: block;
    font-weight: bold;
  }
}

</style>
