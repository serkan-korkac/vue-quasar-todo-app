<template>
  <q-table
    title="TODOS"
    :rows="todos"
    :columns="columns"
    row-key="title"
    :filter-method="customFilter"
    :grid="$q.screen.md || $q.screen.sm || $q.screen.xs"
    :filter="filterTag || filter"
    :selection="
      $q.screen.md || $q.screen.sm || $q.screen.xs ? 'single' : 'none'
    "
    v-model:selected="selected"
  >
    <template v-slot:top-left>
      <div>
        <q-btn
          v-if="selected?.length > 0"
          icon="edit"
          flat
          color="primary"
          round
          size="10px"
          @click="(editId = selected[0].id), (drawerOpen = true)"
        />
        <q-btn
          v-if="selected?.length > 0"
          icon="close"
          flat
          color="negative"
          round
          size="10px"
          @click="store.deleteTodo(selected[0])"
        />
        <q-btn
          icon="filter_alt"
          label=""
          color="primary"
          flat
          round
          :size="$q.screen.md || $q.screen.sm || $q.screen.xs ? '10px' : 'md'"
          @click="filterShow = true"
          class="q-mr-md"
        />
      </div>
    </template>
    <template v-slot:top-right>
      <q-input
        borderless
        dense
        debounce="300"
        v-model="filter"
        placeholder="Search"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template v-slot:body-cell-title="props">
      <q-td :props="props">
        <router-link :to="{ name: 'Detail', params: { id: props.row.id } }">
          {{ props.value }}
          <!-- <q-btn :label="props.value" size="12px" flat color="primary" /> -->
        </router-link>
      </q-td>
    </template>
    <template v-slot:body-cell-action="props">
      <q-td :props="props">
        <q-btn
          icon="edit"
          flat
          color="primary"
          round
          @click="(editId = props.row.id), (drawerOpen = true)"
        />
        <q-btn
          icon="close"
          flat
          color="negative"
          round
          @click="store.deleteTodo(props.row)"
        />
      </q-td>
    </template>
  </q-table>
  <Drawer side="right" v-model="drawerOpen">
    <TodoForm
      v-if="drawerOpen"
      :edit-id="editId"
      @close-modal="drawerOpen = false"
      @cancel="drawerOpen = false"
      :visible-fields="['title', 'tags', 'endDate']"
    ></TodoForm>
  </Drawer>
  <q-dialog v-model="filterShow">
    <q-card style="width: 100%">
      <q-card-section>
        <div class="text-h6">Select a tag</div>
      </q-card-section>
      <q-btn
        v-for="(tag, key) in allTags"
        :label="tag"
        :key="key"
        flat
        size="sm"
        :color="filterTag === tag ? 'primary' : 'secondary'"
        @click="
          filterTag !== tag ? (filterTag = tag) : (filterTag = ''),
            (filterShow = false)
        "
      ></q-btn>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Todo, State } from "../interface/todo";
import { useTodoStore } from "../stores/todo";
import TodoForm from "../components/TodoForm.vue";
import Drawer from "../components/Drawer.vue";
const columns = [
  { name: "id", label: "Id", field: "id", sortable: false },
  { name: "title", label: "Title", field: "title", sortable: false },
  {
    name: "tags",
    label: "Tags",
    field: "tags",
    sortable: false,
    format: (val: any) => `${val.join(", ")}`,
  },
  { name: "endDate", label: "End Date", field: "endDate", sortable: true },
  { name: "state", label: "State", field: "state", sortable: true },
  {
    name: "description",
    label: "Description",
    field: "description",
    sortable: false,
  },
  { name: "action", label: "", field: "action", sortable: false },
];
const store = useTodoStore();
const todos = store.todos;
const allTags = computed(() => store.allTags);
const filter = ref<String>("");
const filterTag = ref<String>("");
const drawerOpen = ref<Boolean>(false);
const filterShow = ref<Boolean>(false);
const editId = ref<String>("");
const selected = ref<any>();
function customFilter(rows: Todo[], terms: string) {
  if (filter.value && !filterTag.value) {
    return rows.filter((x) => x.title.includes(terms));
  } else if (filter.value && filterTag.value) {
    return rows.filter(
      (x) => x.tags?.includes(filterTag.value) && x.title.includes(filter.value)
    );
  }
  return rows.filter((x) => x.tags?.includes(terms));
}
</script>
