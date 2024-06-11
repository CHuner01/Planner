<script>


import task from "@/components/task.vue";
import {router} from "@/router/index.js";



export default {
    data() {
        return {
            title: "",
            description: null,
            priority: Number,
            tag: null,
            dueToStart: null,
            dueToEnd: null,
        };
    },
    props: {
        tasks: {
            type: Object,
            required: true
        },
        validateToken: {
            type: Function,
            required: true,
        }
    },
    methods: {
        createTask() {
            const access_token = localStorage.getItem('access_token')

            fetch("http://localhost:8181/tasks", {
                method: 'POST',
                headers:{
                    'content-type': 'application/json',
                    Authorization: `Bearer ${access_token}`
                },
                body: JSON.stringify({
                    "title": this.title,
                    "description": this.description,
                    "priority": this.priority,
                    "tag": this.tag,
                    "dueToStart": this.dueToStart,
                    "dueToEnd": this.dueToEnd,
                })
            }).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);

                    this.tasks.push({
                        userId: data.userId,
                        taskId: data.taskId,
                        status: data.status,
                        title:  data.title,
                        description: data.description,
                        priority: data.priority,
                        tag: data.tag,
                        dueToStart: data.dueToStart,
                        dueToEnd: data.dueToEnd,
                    });

            });
            this.title = "";
            this.description = null;
            this.priority = Number;
            this.tag = null;
            this.dueToStart = null;
            this.dueToEnd = null;
        },
    }
}


</script>

<template>

    <div class="create_task container">
        <div class="row">
            <div class="col">
                <div class="container">
                    <div class="row my-2">
                        <input class="task_title fs-3" type="text" v-model="title" placeholder="Новая задача" />
<!--                        <textarea class="task_title fs-3" type="text" v-model="title" placeholder="Задача"></textarea>-->
                    </div>
                    <div class="row my-2">
                        <input type="text" v-model="description" placeholder="Описание" />
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="container">
                    <div class="row">
                        <input type="number" v-model="priority" placeholder="Приоритет" />
                        <input type="text" v-model="tag" placeholder="Тег" />
                    </div>
                    <div class="row m-1">
                        <button @click="createTask()" :disabled="this.title.length === 0">Создать</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


<!--    <form ref="info" class="new_task_form">-->
<!--        <input type="text" v-model="title" placeholder="Задача" />-->
<!--        <input type="text" v-model="description" placeholder="Описание" />-->
<!--        <input type="number" v-model="priority" placeholder="Приоритет" />-->
<!--        <input type="text" v-model="tag" placeholder="Тег" />-->
<!--    </form>-->

</template>

<style scoped>

.create_task {
    border: solid;
    border-radius: 15px;

    padding: 6px ;


    width: 50vw;
    min-width: 250px;
}

input, textarea {
    outline: none;
    border: none;
    font-weight: 500;
}


</style>