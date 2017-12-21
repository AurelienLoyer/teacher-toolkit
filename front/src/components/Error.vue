<template>
    <div class="error">
        <img src="src/assets/error.png" alt="">
        <strong>Server error :'(</strong>
    </div>
</template>


<style lang="scss" scoped>
.error {
  background-color: #f7f7f7;
  padding: 10px;
  max-width: 220px;
  margin: auto;
  margin-top: 20px;
  border-radius: 15px;
  img {
    height: 100px;
    margin-bottom: 20px;
  }
  strong {
    display: block;
  }
}
</style>
