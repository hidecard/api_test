<template>
    <div id="app">
    <div class="container">
        <div class="add">
            <form @submit.prevent="addTask" action="">
                <input placeholder="Add new task" type="text" name="" id="">
                <button>Add Task</button>
            </form>
        </div>
        <div v-if="showUpdate" class="update">
            <form @submit.prevent="updateTask" action="">
                <label for="update">Update</label>
                <input v-model="updateTask.title" type="text" placeholder="Update task" name="" id="">
                <button class="u" type="submit">Update Task</button>
                <button class="c" @click="showUpdate = false">Cancel</button>
            </form>
        </div>
        <div class="tabledata">
            <table>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Action</th>
                </tr>
                <tr v-for="(task,index) in tasks" :key="task.id">
                    <td>{{task.id}}</td>
                    <td>{{task.title}}</td>
                    <td>
                        <button class="btn1" @click="editTask(index)">Edit</button>
                        <button class="btn2" @click="deleteTask(task.id)">Delete</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
   </div>
</template>

<script>

export default {
    data(){
        return{
            tasks: [],
            newtask: '',
            updateTask: {
              id : null,
              title : ''
            },
            showUpdate: false
        }
    },
    methods : {
        async fetchTasks(){
            try {
                const response = await this.$axios.get('/tasks/');
                this.tasks = response.data;
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        },
        async addTask(){
            try {
                const response = await this.$axios.post('/tasks/',{
                    title: this.newtask
                });
                this.tasks.push(response.data);
                this.newtask = '';
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        },
        async editTask(index){
            this.updateTask = this.tasks[index];
            this.showUpdate = true;
        },
        async updateTask(){
            try {
                await this.$axios.put(`/tasks/${this.updateTask.id}/`,{
                    title: this.updateTask.title
                });
                this.showUpdate = false;
                this.fetchTasks();
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        },
        async deleteTask(id){
            try {
                await this.$axios.delete(`/tasks/${id}/`);
                this.fetchTasks();
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
    }
}

</script>

<style>
    .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
    }
    .add , .update , .tabledata{
        margin: 10px;
    }
    .add button{
        background-color: orangered;
        color: white;
        padding: 10px;
        border: none;
        border-radius: 5px;
    }
    .add input{
        padding: 10px;
        border-radius: 5px;
    }
    .update input{
        padding: 10px;
        border-radius: 5px;
    }
    .c , .btn2{
        background-color: rgb(255, 0, 43);
        color: white;
        padding: 10px;
        border: none;
        border-radius: 5px;
    }
    .u , .btn1{
        background-color: rgb(6, 192, 46);
        color: white;
        padding: 10px;
        border: none;
        border-radius: 5px;
    }
    table , tr ,td ,th{
        border: 1px solid black;
        padding: 10px 60px;
        border-collapse: collapse;
    }
  </style>