<template lang="html">
    <div class="admin">
        <header>
            <router-link to="/" class="back-btn">
                <i class="fa fa-long-arrow-left"></i>
            </router-link>
            Top Secret Panel
            <div class="logout" @click="logout()">
                <i class="fa fa-sign-out"></i>
            </div>
        </header>

        <div class="color-form">
            <h2>Change color</h2>
            <input type="color" v-model="color"/> <br> 
            <a @click="changeColor()" class="btn btn-theme-color">
                <i class="fa fa-paint-brush" aria-hidden="true"></i>
            </a>
        </div>

        <div class="open-form">
            <h2>Add files</h2>
            <a @click="openFolder()" class="btn btn-theme-color">
                <i class="fa fa-folder" aria-hidden="true"></i>
            </a>
        </div>

        <div class="links-form">
            <h2>Add links</h2>
            <ul>
                <li v-for="(link,i) of links">
                    <input :keyup="saveAll()" placeholder="Label" class="label" type="text" v-model="links[i].label">
                    <input :keyup="saveAll()" placeholder="Link" type="text" v-model="links[i].link">
                    <a class="btn btn-danger" @click="deleteLine(i)">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </a>
                </li>
                <li class="addLine">
                    <a @click="addLine()" class="btn btn-theme-color">
                        <i class="fa fa-plus" aria-hidden="true"></i>
                    </a>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>

    import env from 'env'
import { isArray } from 'util';

    export default {
        name: 'admin',
        data() {
            return {
                links: [],
                color: '',
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
                    .then(data => this.validLinks(data))
                    .then(data => this.links = data)
                    .catch(e => {
                        console.log(e)
                    })

                fetch(env.api + '/infos')
                    .then(resp => resp.json())
                    .then(data => {
                        this.color = data.color
                    })
                    .catch(() => {
                    })
            }
        },
        sockets: {
            links(links) {
                this.links = links
            },
        },
        methods: {

            validLinks(links) {
                console.log(links);
                if(isArray(links) && links.length === 0) return links;
                else if (isArray(links) && links.length !== 0) {
                    if(typeof links[0]  === "object" && links[0].link != undefined) {
                        return links;
                    }else{
                        throw new Error('Invalid format in links.json file')
                    }
                }else {
                    throw new Error('Invalid format in links.json file')
                }
            },

            openFolder() {
                fetch(`${env.api}/openFolder?password=${this.password}`)
                    .catch(() => {
                    })
            },

            changeColor() {
                this.$http.post(`${env.api}/color?password=${this.password}`, {color: this.color})
                    .catch(e => {
                        if (e.status === 401) {
                            console.log('💩')
                            localStorage.removeItem('password')
                            this.$router.push('login')
                        }
                    })
            },
            logout() {
                console.log('💩')
                localStorage.removeItem('password')
                this.$router.push('/')
            },
            addLine() {
                this.links.push({label:'',link:''});
            },
            deleteLine(index) {
                this.links.splice(index, 1)
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
        sockets: {
        },
    }
</script>

<style scoped lang="scss">
    .open-form {
        a{
            width: 100px;
        }
    }

    input.label {
        border-right: 2px solid;
        width: 200px;
    }

    .color-form{
        input{
            width: 200px;
            padding: 0;
            height: 50px;
            border-radius: 20px;
            border: none;
        }
        a{
            width: 100px;
        }
    }

    header {
        background: var(--main-theme-color);
        color: white;
        margin: 0px;
        padding: 10px;
        text-transform: uppercase;

        .back-btn {
            color: black;
            float: left;
            background: rgba(0, 0, 0, 0.2);
            color: white;
            padding: 1px 10px;
            text-decoration: none;
        }

        .logout {
            background: rgba(0, 0, 0, 0.2);
            padding: 1px 10px;
            float: right;
        }
    }

    label {
        cursor: pointer;
        user-select: none;
    }

    ul {
        li {
            width: 700px;
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
        &.btn-theme-color {
            background: var(--main-theme-color);
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
