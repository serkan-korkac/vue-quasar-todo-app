import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { Todo } from "../interface/todo"

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])
  const allTags = computed(() => [...new Set(todos.value.flatMap(x => x.tags))])
  function setTodo(todo: Todo) {
    todos.value.push(todo)
  }
  function updateTodo(todo: Todo) {
    const upd_obj = todos.value.findIndex((obj => obj.id == todo.id));
    todos.value[upd_obj] = { ...todo }
  }
  function deleteTodo(todo: Todo) {
    const d_obj = todos.value.findIndex((obj => obj.id == todo.id));
    todos.value.splice(d_obj, 1)
  }
  function getTodoWithId(id: string): Todo | undefined {
    return todos.value.find(x => x.id === id)
  }
  return { todos, allTags,setTodo, getTodoWithId, updateTodo, deleteTodo }
}, {
  persist: true,
},)