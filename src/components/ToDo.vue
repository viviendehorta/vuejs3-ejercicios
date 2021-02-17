<template>
  <div class="todo" v-if="isVisible">
    <div>
      <input
        data-test="checkbox"
        type="checkbox"
        :checked="done"
        @change="change"
      />
    </div>
    <div>
      <span data-test="span" :style="styleObject" @click="tryEdit">
        {{ text }}
      </span>
      <input
        v-if="isEdited"
        @keyup.enter="onEdit($event.target.value)"
        @focusout="onEdit($event.target.value)"
      />
      <div v-else class="todobtns">
        <font-awesome-icon icon="user-secret" />
        <button class="editbtn" @click="edit">editar</button>
        <button class="rmbtn" v-show="done" @click="remove">x</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    text: String,
    done: Boolean,
    isEdited: Boolean,
    isVisible: Boolean
  },
  emits: ["todoDone", "remove", "editMode", "editFromTodoInput"],
  computed: {
    styleObject() {
      const styleObject = {
        textDecoration: "none"
      };
      if (this.done) {
        styleObject.textDecoration = "line-through";
      }
      return styleObject;
    }
  },
  methods: {
    change(event) {
      this.$emit("todoDone", event.target.checked);
    },
    remove() {
      this.$emit("remove");
    },
    edit() {
      this.$emit("editMode");
    },
    tryEdit() {
      if (!this.done) {
        this.$emit("editMode");
      }
    },
    onEdit(value) {
      if (value) {
        this.$emit("editFromTodoInput", value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.todo {
  display: flex;
  align-items: center;

  div:first-child {
    margin-right: 1rem;
  }

  .editbtn {
    margin-left: 0.5rem;
    text-align: left;
    padding: 0.5rem;
    min-width: 100px;
  }

  .rmbtn {
    margin-left: 0.5rem;
    text-align: left;
    padding: 0.5rem;
  }

  .todobtns {
    display: inline-block;
  }
}
</style>
