<template lang="html">
    <div class="admin">
        <header>
            <router-link to="/" class="back-btn">
                BACK
            </router-link>
            Top Secret Panel
            <div class="logout" @click="logout()">
                icon door
            </div>
        </header>

        <div class="links-form">
            <h2>Add links</h2>
            <label @click="changeSaveMode()">
                Auto-save
                <i class="fa" :class="`fa-toggle-${autoSave}`" aria-hidden="true"></i>
            </label>
            <ul>
                <li v-for="(link,i) of links">
                    <input type="text" v-model="links[i]">
                    <a class="btn btn-danger" @click="deleteLine(i)">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </a>
                </li>
                <li class="addLine">
                    <a @click="addLine()" class="btn btn-green">
                        <i class="fa fa-plus" aria-hidden="true"></i>
                    </a>
                </li>
            </ul>

            <a @click="saveAll()" v-if="autoSave === 'off'" class="btn btn-yellow saveAll">
                <i class="fa fa-floppy-o" aria-hidden="true"></i>
            </a>
        </div>
    </div>
</template>

<script>

    import env from 'env'

    export default {
        name: 'admin',
        data() {
            return {
                links: [],
                autoSave: localStorage.getItem('autoSave') ||  'off',
                password: localStorage.getItem('password'),
            }
        },
        mounted() {
            if (!this.password) {
                this.$router.push('login')
            }
            else {
                fetch(`${env.api}/links?password=${this.password}`)
                    .then(resp => resp.json())
                    .then(data => this.links = data)
                    .catch(e => {
                        console.log(e)
                    })
            }
        },
        sockets: {
            links: function (links) {
                this.links = links
            }
        },
        methods: {
            logout() {
                console.log('💩')
                localStorage.removeItem('password')
                this.$router.push('/')
            },
            addLine() {
                this.links.push('');
            },
            deleteLine(index) {
                this.links.splice(index, 1)
            },
            changeSaveMode() {
                if (this.autoSave === 'on') {
                    this.autoSave = 'off'
                }
                else {
                    this.autoSave = 'on'
                }
                localStorage.setItem('autoSave', this.autoSave)
            },
            saveAll() {
                this.$http.post(`${env.api}/links?password=${this.password}`, this.links)
                    .catch(e => {
                        if (e.status === 401) {
                            console.log('💩')
                            localStorage.removeItem('password')
                            this.$router.push('login')
                        }
                    })
            },
        },
        watch: {
            links() {
                if (this.autoSave === 'on') {
                    this.saveAll()
                }
            },
        },
        sockets: {
        },
    }
</script>

<style scoped lang="scss">
    header {
        background: #42b983;
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

        .logout {
            float: right;
        }
    }

    label {
        cursor: pointer;
        user-select: none;
    }

    ul {
        li {
            width: 500px;
            margin: 20px auto;
            background: rgba(128, 128, 128, 0.2);
            display: flex;
            justify-content: space-between;
            border: 2px solid;
            overflow: hidden;
            max-width: 90%;
            &.addLine {
                text-align: center;
                border: none;
                justify-content: center;
                background: none;
                a {
                    width: 100px;
                }
            }
        }
    }

    input {
        border: none;
        font-size: 14px;
        width: 90%;
        background: none;
        padding-left: 10px;
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
        &.btn-green {
            background: #48B884;
            color: white
        }
        &.btn-yellow {
            background: rgb(224, 226, 65);
            color: #2D3E4F
        }
    }

    .saveAll {
        width: 500px;
        max-width: 90%;
    }
</style>
