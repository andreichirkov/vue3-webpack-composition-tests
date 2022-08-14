<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons is-justify-content-flex-end">
        <router-link to="/post/new" class="button">
          New Post
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Navbar.vue"
})
</script>

<style scoped>

</style>
