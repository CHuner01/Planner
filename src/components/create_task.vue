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
                if (data.status !== 200 && data.status !== undefined) {
                    this.validateToken();
                }
                else {
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
                }
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

    <h2>Новая задача</h2>
    <form ref="info">
        <input type="text" v-model="title" placeholder="Задача" />
        <input type="text" v-model="description" placeholder="Описание" />
        <input type="number" v-model="priority" placeholder="Приоритет" />
        <input type="text" v-model="tag" placeholder="Тег" />
    </form>

    <button @click="createTask()" :disabled="this.title.length === 0">Так пойдет</button>


</template>

<style scoped>

</style>