<template>
  <suspense>
    <template #default>
      <timeline />
    </template>
    <template #fallback>
      <spinner />
    </template>
  </suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Timeline from '@/components/Timeline.vue';
import Spinner from "@/components/Spinner.vue";

export default defineComponent({
  name: 'Home',
  components: {
    Spinner,
    Timeline
  }
});
</script>

<style>

</style>
