<template>
  <q-drawer
    v-model="drawerOpen"
    :side="side || 'left'"
    overlay
    behavior="desktop"
    bordered
  >
    <slot></slot>
  </q-drawer>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
const drawerOpen = ref<Boolean>(false);
interface Props {
  modelValue: boolean;
  side: string;
}
const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);
watch(
  () => props.modelValue,
  (value) => {
    drawerOpen.value = value;
  }
);
</script>
