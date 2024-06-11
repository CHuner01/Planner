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
            // this.form = !this.form;
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
            // this.editForm();
        },
    }
}


</script>

<template>
    <div class="task">
        <div class="container">
            <div class="row">
                <div class="col-1 p-1 icon-checkbox">
                    <input class="form-check-input" type="checkbox" value="">
                </div>
                <div class="col px-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <div class="container">
                        <div class="row task-title">
                            <h3 class="m-0 p-0">{{ task.title }}</h3>
                        </div>
                        <div class="row task-description" v-if="description">
                            <h5 class="m-0 p-0">{{ task.description }}</h5>
                        </div>
                    </div>
                </div>
                <div class="col-2 p-2 icon-close">
                    <button type="button" class="btn-close" aria-label="Close" @click="deleteTask()"></button>
                </div>

            </div>
        </div>

<!--        <p>Приоритет {{ task.priority }}</p>-->
<!--        <p>Тег {{ task.tag }}</p>-->
<!--        <p>Начало {{ task.dueToStart }}</p>-->
<!--        <p>Конец {{ task.dueToEnd }}</p>-->

        <div v-if="form">
            <input type="text" v-model="title" placeholder="Задача" />
            <input type="text" v-model="description" placeholder="Описание" />
            <input type="number" v-model="priority" placeholder="Приоритет" />
            <input type="text" v-model="tag" placeholder="Тег" />
            <button @click="editTask()" :disabled="title.length === 0">Сохранить</button>
        </div>

<!--        <button v-if="!form" @click="editForm()">Редактировать</button>-->
        <button v-if="form" @click="cancelEdit()">Отмена</button>
<!--        <button @click="deleteTask()">Удалить</button>-->
    </div>

<!--    Модальное окно-->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="staticBackdropLabel">Задача</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"
                            @click="cancelEdit()"></button>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <div class="container">
                                    <div class="row my-2">
                                        <input class="fs-3" type="text" v-model="title" placeholder="Задача" />
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div>
                        <button type="button" class="btn btn-danger m-1" data-bs-dismiss="modal" aria-label="Удалить"
                                @click="deleteTask()">Удалить</button>
                    </div>
                    <div>
                        <button type="button" class="btn btn-secondary m-1" data-bs-dismiss="modal" aria-label="Закрыть"
                                @click="cancelEdit()">Отмена</button>
                        <button type="button" class="btn btn-primary m-1" data-bs-dismiss="modal" aria-label="Закрыть"
                                @click="editTask()" :disabled="title.length === 0">Сохранить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<style scoped>

.task {

    border: solid;
    border-radius: 15px;
    width: 50vw;
    min-width: 250px;

    margin: 7px;
    padding: 3px;
}

.task-title {
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 9px;
    margin-top: 7px;

    word-wrap: break-word;
}

.task-description {
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 7px;
    margin-top: 3px;

    word-wrap: break-word;
}

.icon-close {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
}

.icon-checkbox {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
}

.modal-footer {
    display: flex;
    justify-content: space-between;
}




</style>