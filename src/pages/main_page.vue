<script>
//sass / scss БЭМ

import {defineComponent} from "vue";
import Create_task from "@/components/create_task.vue";
import task from "@/components/task.vue";
import {router} from "@/router/index.js";

export default defineComponent({
    components: {task, Create_task},
    data() {
        return {
            tasks: [],
            filter: "Без фильтра",
            filters: new Map([
                ["Новые", "NEW"],
                ["Просроченные", "OVERDUE"],
                ["Выполненные", "COMPLETED"],
                ["Удаленные", "DELETED"],
            ]),
        }
    },
    created() {
        this.getTasks();
    },
    methods: {
        getTasks() {
            this.tasks = [];
            const access_token = localStorage.getItem('access_token');
            fetch("http://localhost:8181/tasks", {
                method: 'GET',
                headers:{
                    'content-type': 'application/json',
                    Authorization: `Bearer ${access_token}`
                },
            }).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
                for (let i = 0; i < data.length; i++) {
                    this.tasks.push({
                        userId: data[i].userId,
                        taskId: data[i].taskId,
                        status: data[i].status,
                        title:  data[i].title,
                        description: data[i].description,
                        priority: data[i].priority,
                        tag: data[i].tag,
                        dueToStart: data[i].dueToStart,
                        dueToEnd: data[i].dueToEnd,
                    });
                }
            })
        },
        getFilter() {
            this.tasks = [];
            if (this.filter === "Без фильтра") {
                this.getTasks();
            }
            else {
                const access_token = localStorage.getItem('access_token');
                fetch("http://localhost:8181/tasks/" + (this.filters.get(this.filter)).toString(), {
                    method: 'GET',
                    headers:{
                        'content-type': 'application/json',
                        Authorization: `Bearer ${access_token}`
                    },
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    console.log(data);
                    for (let i = 0; i < data.length; i++) {
                        this.tasks.push({
                            userId: data[i].userId,
                            taskId: data[i].taskId,
                            status: data[i].status,
                            title:  data[i].title,
                            description: data[i].description,
                            priority: data[i].priority,
                            tag: data[i].tag,
                            dueToStart: data[i].dueToStart,
                            dueToEnd: data[i].dueToEnd,
                        });
                    }
                })
            }
        },
        validateToken() {
            const refresh_token = localStorage.getItem('refresh_token');
            fetch("http://localhost:8181/api/v1/auth/refresh-token", {
                method: 'POST',
                headers:{
                    'content-type': 'application/json',
                    Authorization: `Bearer ${refresh_token}`
                },
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if (data.status !== 200 && data.status !== undefined) {
                    router.push({ name:'auth'});
                }
                else {
                    localStorage.setItem('access_token', data.accessToken);
                    localStorage.setItem('refresh_token', data.refreshToken);
                }
            })
        },
    }
})

</script>

<template>

    <div class="container text-center m-4">
        <div class="row">
            <div class="col">
                <h1>Planner</h1>
            </div>
            <div class="col-2">
                <button @click="$router.push({ name: 'auth'})">Выйти</button>
            </div>
        </div>
    </div>


    <div class="container tasks-form">
        <create_task :tasks="this.tasks" :validateToken="this.validateToken" />
    </div>


    <div class="container text-center m-4">
        <div class="row">
            <div class="col">
                <h2>Мои задачи</h2>
            </div>
            <div class="col-2">
                <select v-model="filter" @change="getFilter()">
                    <option>Без фильтра</option>
                    <option>Новые</option>
                    <option>Просроченные</option>
                    <option>Выполненные</option>
                    <option>Удаленные</option>
                </select>
            </div>
            <div class="col">
                <h4>Тег</h4>
            </div>
            <div class="col">
                <input />
            </div>
        </div>
    </div>


    <div class="container text-center">
        <div class="row">
            <div class="col">
                Колонка
            </div>
        </div>
    </div>

    <div v-if="tasks.length === 0">
        <p>Задач пока нет</p>
    </div>

    <div class="container tasks-form">
        <task v-for="(el, index) in tasks" :key="index" :task="el" :tasks="this.tasks" :index="index" />
    </div>




</template>

<style scoped>

.tasks-form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    margin-top: 30px;
    margin-bottom: 50px;

}

</style>