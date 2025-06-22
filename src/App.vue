<template>
  <div id="app">
    <div class="container">
      <!-- Add Task Form -->
      <div class="add">
        <form @submit.prevent="addTask">
          <input v-model="newtask" placeholder="Add new task" type="text" />
          <button type="submit">Add Task</button>
        </form>
      </div>

      <!-- Update Task Form -->
      <div v-if="showUpdate" class="update">
        <form @submit.prevent="performUpdateTask">
          <label for="update">Update</label>
          <input v-model="updateData.title" type="text" placeholder="Update task" />
          <button class="u" type="submit">Update Task</button>
          <button class="c" type="button" @click="cancelUpdate">Cancel</button>
        </form>
      </div>

      <!-- Task Table -->
      <div class="tabledata">
        <table>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
          <tr v-for="(task, index) in tasks" :key="task.id">
            <td>{{ task.id }}</td>
            <td>{{ task.title }}</td>
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
  data() {
    return {
      tasks: [],
      newtask: '',
      updateData: { id: null, title: '' },
      showUpdate: false
    };
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const res = await this.$axios.get('/tasks/');
        this.tasks = res.data;
      } catch (err) {
        console.error('Error fetching tasks:', err.response?.data || err.message);
      }
    },
    async addTask() {
      if (!this.newtask.trim()) return;
      try {
        const res = await this.$axios.post('/tasks/', { title: this.newtask });
        this.tasks.push(res.data);
        this.newtask = '';
      } catch (err) {
        console.error('Error adding task:', err.response?.data || err.message);
      }
    },
    editTask(index) {
      this.updateData = { ...this.tasks[index] };
      this.showUpdate = true;
    },
    async performUpdateTask() {
      try {
        await this.$axios.put(`/tasks/${this.updateData.id}/`, {
          title: this.updateData.title
        });
        this.showUpdate = false;
        this.updateData = { id: null, title: '' };
        this.fetchTasks();
      } catch (err) {
        console.error('Error updating task:', err.response?.data || err.message);
      }
    },
    cancelUpdate() {
      this.showUpdate = false;
      this.updateData = { id: null, title: '' };
    },
    async deleteTask(id) {
      try {
        await this.$axios.delete(`/tasks/${id}/`);
        this.fetchTasks();
      } catch (err) {
        console.error('Error deleting task:', err.response?.data || err.message);
      }
    }
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.add, .update, .tabledata {
  margin: 10px;
}
.add input, .update input {
  padding: 10px;
  border-radius: 5px;
}
.add button {
  background-color: orangered;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
}
.c, .btn2 {
  background-color: rgb(255, 0, 43);
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
}
.u, .btn1 {
  background-color: rgb(6, 192, 46);
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
}
table, tr, td, th {
  border: 1px solid black;
  padding: 10px 60px;
  border-collapse: collapse;
}
</style>
