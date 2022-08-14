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
import {defineComponent, onMounted, ref, watch, watchEffect} from "vue";
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
    const html = ref('')

    //Правильный способ получить html элемент
    const contentEditable = ref<HTMLDivElement | null>(null)

    //contentEditable на момент хука уже будет существовать (не null)
    //Получение через Refs
    onMounted(() => {
      if (!contentEditable.value) {
        throw Error('It never happen')
      }

      //При рендере присваиваем html елементу значение из ref-переменной
      contentEditable.value.innerText = content.value
    })

    //Забирает значение из эдитора
    const handleInput = () => {
      if (!contentEditable.value) {
        //Ошибки не может быть -> функция не отработает до onMounted
        //Значение будет точно не null
        throw Error('It never happen')
      }

      content.value = contentEditable.value.innerText || ''
    }

    //handleInput триггерит content, отрабатывает cb с заменой html
    watchEffect(() => {
      //Вставляем html с маркдаун разметкой (создаются новые тэги)
      html.value = parse(content.value, {
        gfm: true,
        breaks: true
      })
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
