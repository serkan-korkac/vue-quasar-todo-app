<template>
  <q-header reveal bordered class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-btn
        dense
        flat
        round
        icon="menu"
        @click="toggleLeftDrawer"
        class="lt-md"
      />

      <q-toolbar-title>
        <img
          style="max-width: 96px; vertical-align: middle; object-fit: cover"
          src="https://simpliciter.io/wp-content/uploads/2022/05/auth0-logo.png"
        />
        <span class="text-dark gt-md"> Todo App </span>
      </q-toolbar-title>
      <q-tabs align="center" class="gt-md q-mr-md">
        <q-route-tab to="/" label="List" />
        <!-- <q-route-tab to="/page2" label="Ekle" /> -->
        <!-- <q-route-tab to="/page3" label="Page Three" /> -->
      </q-tabs>

      <q-btn icon="add" label="Add New" color="green" @click="medium = true" />
    </q-toolbar>
  </q-header>
  <q-drawer
    v-model="leftDrawerOpen"
    side="left"
    overlay
    behavior="desktop"
    bordered
  >
    <q-item active clickable to="/">
      <q-item-section avatar>
        <q-icon name="list" />
      </q-item-section>

      <q-item-section> List </q-item-section>
    </q-item>
  </q-drawer>
  <q-dialog v-model="medium">
    <q-card style="width: 100%">
      <AddForm
        @close-modal="medium = false"
        @cancel="medium = false"
        :visible-fields="['id', 'title', 'tags', 'state', 'endDate']"
      ></AddForm>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Todo, State } from "../interface/todo";
import AddForm from "../components/TodoForm.vue";
const medium = ref<Boolean>(false);
const leftDrawerOpen = ref<Boolean>(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
