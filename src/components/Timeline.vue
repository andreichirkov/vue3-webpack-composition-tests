<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a v-for="period in periods"
         :class="{'is-active': period === currentPeriod}"
         @click="setPeriod(period)"
         :key="period">
        {{ period }}
      </a>
    </span>

    <a v-for="post in posts"
       class="panel-block"
       :key="post.id">
      <a>{{ post.title }}</a>
      <div>{{ post.created.format('Do MMM') }}</div>
    </a>

  </nav>
</template>

<script lang="ts">
import {defineComponent, ref, computed} from 'vue';
import moment from "moment";
import {today, thisWeek, thisMonth} from "@/mocks";

type Period = 'Today' | 'This week' | 'This month'

export default defineComponent({
  name: 'Timeline',

  setup() {
    const periods = ['Today', 'This week', 'This month']
    const currentPeriod = ref<Period>('Today')
    const posts = computed(() => {
      return [today, thisWeek, thisMonth].filter(post => {
        if(currentPeriod.value === 'Today') {
          //Сегодня = 1 день после вчера
          return post.created.isAfter(moment().subtract(1, 'day'))
        }

        if(currentPeriod.value === 'This week') {
          return post.created.isAfter(moment().subtract(1, 'week'))
        }

        if(currentPeriod.value === 'This month') {
          return post.created.isAfter(moment().subtract(1, 'month'))
        }

        return false
      })
    })

    const setPeriod = (period: Period) => {
      currentPeriod.value = period
    }

    return {
      posts,
      periods,
      currentPeriod,
      setPeriod
    }
  }
})
</script>

<style scoped>

</style>
