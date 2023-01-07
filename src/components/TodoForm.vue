<template>
  <div style="width: 100%">
    <q-card-section>
      <div class="text-h6">{{ editId ? "Update Todo" : "Add Todo" }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-form @submit.prevent="addForm">
        <q-input
          v-if="props.visibleFields.includes('title')"
          label="Title"
          autofocus
          v-model="form.title"
          type="string"
          :rules="[
            (val) => !!val || 'Title is required',
            (val) => val.length < 30 || 'Please use maximum 30 character',
            (val) => !containsNumbers(val) || 'Please only use string',
          ]"
        />
        <div class="q-mt-sm" v-if="props.visibleFields.includes('description')">
          <label class="text-caption">Description</label>
          <q-editor v-model="form.description" min-height="5rem" />
        </div>
        <q-input
          v-if="props.visibleFields.includes('tags')"
          label="Tag"
          v-model="newTag"
          @keyup.enter.prevent="addTag"
          :rules="[
            (val) => !containsNumbers(val) || 'Please only use string',
          ]"
          class="flex"
          dense
        >
          <template v-slot:append>
            <q-btn
              icon="add"
              color="primary"
              size="10px"
              flat
              round
              @click="addTag"
            />
          </template>
        </q-input>
        <div v-if="props.visibleFields.includes('tags')">
          <q-chip
            removable
            size="10px"
            @remove="form.tags.splice(key, 1)"
            v-for="(tag, key) in form.tags"
            :key="key"
          >
            {{ tag }}
          </q-chip>
        </div>
        <q-input
          label="End Date"
          v-model="form.endDate"
          mask="date"
          v-if="props.visibleFields.includes('endDate')"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="form.endDate">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-checkbox
          v-if="props.visibleFields.includes('state')"
          left-label
          v-model="state"
          :label="state ? 'Completed' : 'Todo'"
          checked-icon="task_alt"
          unchecked-icon="highlight_off"
        />
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="emit('cancel', true)" />
          <q-btn flat :label="editId ? 'Update' : 'Add'" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card-section>
  </div>
</template>
<script setup lang="ts">
import { useQuasar } from "quasar";
import { ref } from "vue";
import { State, Todo } from "../interface/todo";
import { useTodoStore } from "../stores/todo";
interface Props {
  visibleFields: string[];
  editId: string;
}
const emit = defineEmits(["closeModal", "cancel"]);
const props = defineProps<Props>();
const store = useTodoStore();
const $q = useQuasar();
const state = ref<Boolean>(true);
const newTag = ref<String>("");
const form = ref<Todo>({
  id: uuidv4(),
  title: "",
  description: "",
  tags: [],
  state: state.value ? State.COMPLETED : State.TODO,
  endDate: "",
});
function addTag() {
  if (newTag.value) {
    form.value.tags?.push(newTag.value);
    newTag.value = "";
  }
}
function addForm() {
  form.value.state = state.value ? State.COMPLETED : State.TODO;
  if (props.editId) {
    store.updateTodo(form.value);
  } else {
    store.setTodo(form.value);
  }
  $q.notify({
    position: "top",
    color: "green",
    message: "Success",
  });
  emit("closeModal", true);
}
function uuidv4(): String {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
if (props.editId) {
  const todo = { ...store.getTodoWithId(props.editId) };
  form.value = JSON.parse(JSON.stringify(todo));
  state.value = form.value.state === "Completed";
}
function containsNumbers(value: string) {
  return /[0-9]/.test(value);
}
</script>
