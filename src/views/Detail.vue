<template>
  <div>
    <q-card-section>
      <div class="text-h6">Todo Detail</div>
      <div>
        <div :class="todo.state === 'Completed' ? 'text-strike' : null">
          <b>Title: </b><span>{{ todo.title }}</span>
        </div>
        <div>
          <b>Tags: </b><span>{{ todo.tags?.join(",") }}</span>
        </div>
        <div>
          <b>Description: </b><span>{{ todo.description }}</span>
        </div>
        <div>
          <b>State: </b><span>{{ todo.state }}</span>
        </div>
        <div :class="todo.state === 'Completed' ? 'text-strike' : null">
          <b>End Date: </b><span>{{ todo.endDate }}</span>
        </div>
      </div>
    </q-card-section>
    <TodoForm
      @cancel="router.back()"
      :edit-id="editId"
      :visible-fields="['title', 'state', 'endDate', 'description']"
    ></TodoForm>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue-demi";
import { useRoute, useRouter } from "vue-router";
import TodoForm from "../components/TodoForm.vue";
import { Todo } from "../interface/todo";
import { useTodoStore } from "../stores/todo";
const route = useRoute();
const router = useRouter();
const editId: string = route.params.id;
const store = useTodoStore();
const todo: Todo = computed(() => store.getTodoWithId(editId));
</script>
