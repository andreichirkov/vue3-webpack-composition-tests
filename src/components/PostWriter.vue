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
      <div
        contenteditable
        @input="handleInput"
        ref="contentEditable">
      </div>
    </div>
    <div class="column">
      {{ content }}
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
    const content = ref('Тут текст маркдаун')
    const contentEditable = ref<HTMLDivElement | null>(null)

    const handleInput = () => {
      if (!contentEditable.value) {
        throw Error('It never happen')
      }

      content.value = contentEditable.value.textContent || ''
    }

    onMounted(() => {
      if (!contentEditable.value) {
        throw Error('It never happen')
      }

      contentEditable.value.textContent = content.value
    })

    return {
      title,
      content,
      contentEditable,
      handleInput
    }
  }
})
</script>

<style scoped>

</style>
