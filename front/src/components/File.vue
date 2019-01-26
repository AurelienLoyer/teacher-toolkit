<template lang="html">
    <a class="file" :href="`${api_url}/files/${file}`">
      <img :src="getFileIcon(file)" @error="imageLoadError" alt="">
      <span :title="file">{{file}}</span>
    </a>
</template>

<script>

export default {
  name: 'file',
  data() {
    return {
      api_url: `${process.env.VUE_APP_API_URL}`,
    };
  },
  components: {
  },
  props: [
    'file',
  ],
  created() {
  },
  methods: {
    getFileIcon(filename) {
      const ext = filename.substr(filename.lastIndexOf('.') + 1);
      return `./assets/icons/${ext}.png`;
    },
    imageLoadError(e) {
      e.target.src = './assets/icons/default.png';
    },
  },
};
</script>

<style scoped lang="scss">

.file{
  text-decoration: none;
  padding: 10px;
  text-align: center;
  width: 200px;
  overflow: hidden;
  display: block;

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
    margin: auto;
  }
  span{
    transition: all 0.2s;
    padding: 10px;
    display: block;
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

</style>
