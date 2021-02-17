<template>
  <div class="todo-input">
    <label for="todo-input">Introduzca un texto</label>
    <input
      type="text"
      id="todo-input"
      @keyup.enter="onKeyup($event.target.value)"
      :value="text"
    />
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    editedTodoIndex: Number
  },
  methods: {
    onKeyup(value) {
      if (value) {
        if (this.editedTodoIndex >= 0) {
          this.$emit("editFromGlobalInput", [value, this.editedTodoIndex]);
        } else {
          this.$emit("add", value);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.todo-input {
  margin-bottom: 1rem;

  input {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 20px;
    margin-left: 1rem;
  }
}
</style>
