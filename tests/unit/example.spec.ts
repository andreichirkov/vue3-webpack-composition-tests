import {nextTick} from "vue";
import {mount, flushPromises} from "@vue/test-utils";
import Timeline from "@/components/Timeline.vue";
import {today, thisWeek, thisMonth} from "@/mocks";

//Передача нод модуля
//Делаем кастомную имплементацию
jest.mock('axios', () => ({
  get: (url: string) => {
    return Promise.resolve({
      data: [today, thisWeek, thisMonth]
    })
  }
}))

function mountTimeline() {
  return mount({
    components: {Timeline},
    template: `
        <suspense>
          <template #default>
            <timeline />
          </template>
          <template #fallback>
            Loading...
          </template>
        </suspense>
      `
  })
}

describe('Timeline', () => {
  it('renders today post default', async () => {
    const wrapper = mountTimeline()
    await flushPromises()

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
  })

  it('update when click on period btn', async () => {
    const wrapper = mountTimeline()
    await flushPromises()

    await wrapper.get('[data-test="This Week"]').trigger('click') //nextTick

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'))
  })

  it('update when click on period btn', async () => {
    const wrapper = mountTimeline()
    await flushPromises()

    await wrapper.get('[data-test="This Month"]').trigger('click') //nextTick

    expect(wrapper.html()).toContain(today.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'))
    expect(wrapper.html()).toContain(thisMonth.created.format('Do MMM'))
  })
})

