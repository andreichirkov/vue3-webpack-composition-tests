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
      <div v-html="html"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {Post} from "@/mocks";
import {parse} from "marked";

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
    const content = ref('## Тут текст маркдаун')
    const html = ref(parse(content.value))
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
      html,
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
