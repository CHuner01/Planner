<script>

export default {
    data() {
        return {
            title:  this.task.title,
            description: this.task.description,
            priority: this.task.priority ,
            tag: this.task.tag,
            dueToStart: this.task.dueToStart,
            dueToEnd: this.task.dueToEnd,
            form: false
        }
    },
    props: {
        task: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        tasks: {
            type: Object,
            required: true
        }
    },
    methods: {
        editForm() {
            this.form = !this.form;
        },
        editTask() {
            const access_token = localStorage.getItem('access_token');
            fetch("http://localhost:8181/tasks", {
                method: 'PUT',
                headers:{
                    'content-type': 'application/json',
                    Authorization: `Bearer ${access_token}`
                },
                body: JSON.stringify({
                    "taskId": this.task.taskId,
                    "userId": this.task.userId,
                    "title": this.title,
                    "description": this.description,
                    "status": this.task.status,
                    "priority": this.priority,
                    "tag": this.tag,
                    "dueToStart": this.dueToStart,
                    "dueToEnd": this.dueToEnd,
                })
            }).then((response) => {
                console.log(response)
                return response.json();
            }).then((data) => {
                console.log(data);
                this.tasks[this.index] = ({
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
            this.form = !this.form;
        },
        deleteTask() {
            this.tasks.splice(this.index, 1);

            const access_token = localStorage.getItem('access_token');
            fetch("http://localhost:8181/tasks/" + (this.task.taskId).toString(), {
                method: 'DELETE',
                headers:{
                    'content-type': 'application/json',
                    Authorization: `Bearer ${access_token}`
                },
            }).then((response) => {
                console.log(response)
                return response.json();
            }).then((data) => {
                console.log(data);
            })
        },
        cancelEdit() {
            this.title = this.task.title;
            this.description = this.task.description;
            this.priority = this.task.priority ;
            this.tag = this.task.tag;
            this.dueToStart = this.task.dueToStart;
            this.dueToEnd = this.task.dueToEnd;
            this.editForm();
        },
    }
}


</script>

<template>
    <div class="task">
        <h3>{{ task.title }}</h3>
        <h4>{{ task.description }}</h4>
        <p>Приоритет {{ task.priority }}</p>
        <p>Тег {{ task.tag }}</p>
        <p>Начало {{ task.dueToStart }}</p>
        <p>Конец {{ task.dueToEnd }}</p>

        <div v-if="form">
            <input type="text" v-model="title" placeholder="Задача" />
            <input type="text" v-model="description" placeholder="Описание" />
            <input type="number" v-model="priority" placeholder="Приоритет" />
            <input type="text" v-model="tag" placeholder="Тег" />
            <button @click="editTask()" :disabled="title.length === 0">Сохранить</button>
        </div>

        <button v-if="!form" @click="editForm()">Редактировать</button>
        <button v-if="form" @click="cancelEdit()">Отмена</button>
        <button @click="deleteTask()">Удалить</button>
    </div>


</template>

<style scoped>
.task {
    border: solid;
}


</style>