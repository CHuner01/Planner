<script>

import { router } from '../router/index.js'

export default {
    data() {
        return {
            username: "",
            email: "",
            password: "",
            
        };
    },
    methods: {
        sendData() {
            if (this.username !== "" && this.email !== "" && this.password !== "") {
                fetch("http://localhost:8181/api/v1/auth/register", {
                    method: 'POST',
                    headers:{'content-type': 'application/json'},
                    body: JSON.stringify({
                        "username": this.username,
                        "email": this.email,
                        "password": this.password
                    })
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    if (data.status !== 200 && data.status !== undefined) {
                        console.log(data.status)
                        console.log(data)
                        for (var i in data.errors) {
                            console.log(data.errors[i].defaultMessage)
                        }
                    }
                    else {
                        localStorage.setItem('access_token', data.accessToken);
                        localStorage.setItem('refresh_token', data.refreshToken);
                        console.log(data)
                        router.push({ name:'main'})
                    }
                })
            }
        },

    },
}

</script>

<template>
<h1>Регистрация</h1>
<input type="text" v-model="username" placeholder="Имя" />
<input type="password" v-model="password" placeholder="Пароль" />
<input type="email" v-model="email" placeholder="Email" />
<button @click="sendData()">Зарегистрировать</button>
<button @click="$router.push({ name: 'auth'})">Если уже зареган</button>

</template>

<style scoped>

</style>