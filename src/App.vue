<template>
    <div id="app">
    <div class="container">
        <div class="add">
            <form action="">
                <input placeholder="Add new task" type="text" name="" id="">
                <button>Add Task</button>
            </form>
        </div>
        <div class="update">
            <form action="">
                <label for="update">Update</label>
                <input type="text" placeholder="Update task" name="" id="">
                <button class="u">Update Task</button>
                <button class="c">Cancel</button>
            </form>
        </div>
        <div class="tabledata">
            <table>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Action</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Hello</td>
                    <td>
                        <button class="btn1">Edit</button>
                        <button class="btn2">Delete</button>
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