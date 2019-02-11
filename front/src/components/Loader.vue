<template>
    <div class="loader">
        <img src="/assets/loader.gif" alt="">
        <strong>Loading {{type}}...</strong>
    </div>
</template>

<script>
export default {
  props: [
    'type',
  ],
};
</script>

<style lang="scss" scoped>
    .loader {
        padding: 10px;
        max-width: 220px;
        margin: auto;
        margin-top: 20px;
        border-radius: 15px;
        img {
            height: 100px;
        }
        strong {
            display: block;
            margin-bottom: 20px;
        }
    }
</style>
