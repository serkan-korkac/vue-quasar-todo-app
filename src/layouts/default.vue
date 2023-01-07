<template>
  <q-layout view="hHh lpR fFf">
    <custom-nav></custom-nav>
    <slot></slot>
    <CustomFooter></CustomFooter>
  </q-layout>
</template>
<script lang="ts" setup>
import CustomFooter from "../components/CustomFooter.vue";
import CustomNav from "../components/CustomNav.vue";
</script>
