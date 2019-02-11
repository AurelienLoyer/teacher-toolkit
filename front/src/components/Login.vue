<template lang="html">
    <div class="admin">
        <header>
            <router-link to="/" class="back-btn">
                <i class="fa fa-long-arrow-left"></i>
            </router-link>
            Login
        </header>

        <form class="login-form" @submit.prevent="log()">
            <h2>Enter your password</h2>
            <input type="password" v-model="password" placeholder="password">

            <a @click="log()" v-if="password" class="btn btn-theme-color login">
                Log In
            </a>
        </form>
    </div>
</template>

<script>

export default {
  name: 'login',
  data() {
    return {
      password: '',
    };
  },
  mounted() {

  },
  sockets: {

  },
  methods: {
    log() {
      if (this.password) {
        this.$http.post(`${process.env.VUE_APP_API_URL}/password`, { password: this.password })
          .then((res) => {
            console.log(res);
            localStorage.setItem('password', this.password);
            this.$router.push('admin');
          })
          .catch((e) => {
            this.password = '';
            console.log(`${e.status} 💩`);
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">
    header {
        background: var(--main-theme-color);
        color: white;
        margin: 0px;
        padding: 10px;
        text-transform: uppercase;

        .back-btn {
            color: black;
            float: left;
            background: #1aa263;
            padding: 1px 10px;
            text-decoration: none;
        }
    }

    label {
        cursor: pointer;
        user-select: none;
    }

    .login-form {
        background: #f1f1f1;
        width: 415px;
        padding-bottom: 30px;
        margin: 70px auto;
        border-radius: 5px;
        padding-top: 1px;
    }

    input {
        border: none;
        font-size: 14px;
        width: 200px;
        background: #dfe2e1;
        padding: 10px;
        display: block;
        margin: 20px auto;

    }

    .btn {
        width: 40px;
        height: 35px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.2s;
        &:hover {
            transform: scale(1.1);
        }
        &.btn-danger {
            background: #ef4444;
            color: white
        }
        &.btn-blue {
            background: #59b3f0;
            color: white
        }
        &.btn-theme-color {
            background: var(--main-theme-color);
            color: white
        }
        &.btn-yellow {
            background: rgb(224, 226, 65);
            color: #2D3E4F
        }
    }

    .login {
        width: 500px;
        max-width: 90%;
    }
</style>
