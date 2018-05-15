<template lang="html">
    <footer>Made with
        <i class="fa fa-heart" aria-hidden="true"></i> by
        <a target="_blank" href="https://github.com/T3kstiil3/teacher_toolkit">Aurélien</a>
    </footer>
</template>

<script>

    export default {
        name: 'footer',
        data() {
            return {
            }
        },
        components: {

        },
        sockets: {
        },
    }
</script>

<style scoped lang="scss">
    footer {
        background: var(--main-theme-color);
        color: white;
        margin: 0px;
        padding: 5px;
        position: fixed;
        bottom: 0;
        width: 100%;
        font-size: 12px;
        a {
            color: white;
        }
        i {
            transition: all 0.2s;
        }
        &:hover {
            i {
                transform: scale(1.1);
                color: black;
            }
        }
    }
</style>
