<template>
  <Logo></Logo>

  <input type="checkbox" :checked="undoneOnly" @change="onChangeUndoneFilter" />
  <span>Undone Todos</span>

  <ToDoInput
    @add="handleAddTodo"
    @editFromGlobalInput="handleEditFromGlobalInput"
    :text="todoInput.text"
    :editedTodoIndex="todoInput.editedTodoIndex"
  >
  </ToDoInput>

  <ToDo
    v-for="(todo, index) in todos"
    data-test="todo"
    :key="index"
    :text="todo.text"
    :done="todo.done"
    :isEdited="todo.isEdited"
    :isVisible="todo.isVisible"
    @todoDone="handleTodoChange($event, index)"
    @remove="handleTodoRemove(index)"
    @editMode="handleTodoEditMode(index)"
    @editFromTodoInput="handleEditFromTodoInput($event, index)"
  ></ToDo>
</template>

<script>
import ToDoInput from "./components/ToDoInput.vue";
import Logo from "./components/Logo.vue";
import ToDo from "./components/ToDo.vue";

export default {
  name: "App",
  components: {
    Logo,
    ToDoInput,
    ToDo
  },
  data() {
    return {
      todos: [],
      todoInput: {
        text: "",
        editedTodoIndex: -1
      },
      selectedTodo: {},
      undoneOnly: false
    };
  },
  methods: {
    handleTodoChange(event, index) {
      this.todos[index].done = event;
      this.todos[index].isVisible = !this.todos[index].done || !this.undoneOnly;
    },
    handleAddTodo(text) {
      this.todos.push({
        done: false,
        text,
        isEdited: false,
        isVisible: true
      });
      this.todoInput.text = "";
    },
    handleTodoRemove(index) {
      this.todos.splice(index, 1);
    },
    handleTodoEditMode(index) {
      console.log(`switch edition mode for item ${index}.`);
      this.todoInput.editedTodoIndex = index;
      this.todoInput.text = this.todos[index].text;
      this.todos[index].isEdited = true;
    },
    handleEditFromGlobalInput(params) {
      const newText = params[0];
      const todoIndex = params[1];
      console.log(`Update item ${todoIndex} with value '${newText}' !!`);
      if (todoIndex < this.todos.length) {
        this.todos[todoIndex].text = newText;
      }
      this.todoInput.text = "";
      this.todoInput.editedTodoIndex = -1;
      this.todos[todoIndex].isEdited = false;
    },
    handleEditFromTodoInput(event, index) {
      const newText = event;
      console.log(`Update item ${index} with value '${newText}' !!`);
      if (index < this.todos.length) {
        this.todos[index].text = newText;
      }
      this.todoInput.text = "";
      this.todoInput.editedTodoIndex = -1;
      this.todos[index].isEdited = false;
    },
    onChangeUndoneFilter(event) {
      const hideDoneTodos = event.target.checked;
      this.todos.forEach(todo => {
        todo.isVisible = hideDoneTodos === false || todo.done === false;
      });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
