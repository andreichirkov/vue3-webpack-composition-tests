<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a v-for="period in periods"
         :class="{'is-active': period === currentPeriod}"
         :data-test="period"
         @click="setPeriod(period)"
         :key="period">
        {{ period }}
      </a>
    </span>

    <timeline-post
        v-for="post in posts"
        :post="post"
        :key="post.id"/>
  </nav>
</template>

<script lang="ts">
import {defineComponent, ref, computed} from 'vue';
import moment from "moment";
import {today, thisWeek, thisMonth} from "@/mocks";
import TimelinePost from "@/components/TimelinePost.vue";

type Period = 'Today' | 'This Week' | 'This Month'

function delay() {
  return new Promise(res => {
    setTimeout(res, 2000)
  })
}

export default defineComponent({
  name: 'Timeline',
  components: {TimelinePost},
  async setup() {
    await delay()
    const periods = ['Today', 'This Week', 'This Month']
    const currentPeriod = ref<Period>('Today')
    const posts = computed(() => {
      return [today, thisWeek, thisMonth].filter(post => {
        if (currentPeriod.value === 'Today') {
          //Сегодня = 1 день после вчера
          return post.created.isAfter(moment().subtract(1, 'day'))
        }

        if (currentPeriod.value === 'This Week') {
          return post.created.isAfter(moment().subtract(1, 'week'))
        }

        if (currentPeriod.value === 'This Month') {
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
