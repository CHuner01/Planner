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
    <div class="container centered">
        <div class="container text-center auth-form">
            <div class="row m-1">
                <div class="col">
                    <p class="fw-weight-bold">Авторизация</p>
                </div>
            </div>
            <div class="row m-2">
                <div class="col">
                    <input type="text" class="form-control fs-5" v-model="username" placeholder="Имя" />
                </div>
            </div>
            <div class="row m-2">
                <div class="col">
                    <input type="password" class="form-control fs-5" v-model="password" placeholder="Пароль" />
                </div>
            </div>
            <div class="row m-3">
                <div class="col">
                    <button type="button" class="btn btn-primary fs-4" @click="sendData()">Войти</button>
                </div>
            </div>
            <div class="row">
                <div class="col">
<!--                    <button type="button" class="btn btn-primary" @click="$router.push({ name: 'regis'})">Нет аккаунта</button>-->
                    <a href="#" class="link-secondary" @click="$router.push({ name: 'regis'})">Зарегистрироваться</a>
                    <p v-if="error">Неправильно введено имя или пароль</p>
                </div>
            </div>
        </div>
    </div>




</template>

<style scoped>

p {
    font-size: 70px;
    margin: 0;
}

input {
    height: 45px;
    width: 75vw;
    max-width: 450px;
}

.btn {
    height: 50px;
    width: 45vw;
    max-width: 200px;
}

.auth-form {

    display: flex;
    flex-direction: column;
    height: 100%;

    align-items: center;
    justify-content: center;

}

.centered {

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    padding: 0;
    max-width: 100%;
    width: 100%;

    background-color: aquamarine;
}




</style>