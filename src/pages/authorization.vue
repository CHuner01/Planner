<script>

import {router} from "@/router/index.js";

export default {
    data() {
        return {
            username: "",
            email: "",
            password: "",
            error: false,
        };
    },
    methods: {
        sendData() {
            if (this.username !== "" && this.password !== "") {
                fetch("http://localhost:8181/api/v1/auth/authenticate", {
                    method: 'POST',
                    headers:{'content-type': 'application/json'},
                    body: JSON.stringify({
                        "username": this.username,
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
                        this.error = true
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
<h1>Авторизация</h1>
<input type="text" v-model="username" placeholder="Имя" />
<input type="password" v-model="password" placeholder="Пароль" />
<button @click="sendData()">Войти</button>
<button @click="$router.push({ name: 'regis'})">Нет аккаунта</button>
<p v-if="error">Неправильно введено имя или пароль</p>

</template>

<style scoped>

</style>