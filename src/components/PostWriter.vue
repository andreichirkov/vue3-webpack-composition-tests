<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">New Post</div>
        <input v-model="title" type="text" class="input">
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div contenteditable ref="contentEditable"></div>
    </div>
    <div class="column">
      prewiew
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {Post} from "@/mocks";

export default defineComponent ({
  name: "PostWriter",
  props: {
    post: {
      type: Object as () => Post,
      required: true
    }
  },
  setup(props) {
    const title = ref(props.post.title)
    const content = ref('')
    const contentEditable = ref(null)

    onMounted(() => {
      console.log(typeof contentEditable.value)
    })

    return {
      title,
      content,
      contentEditable
    }
  }
})
</script>

<style scoped>

</style>
