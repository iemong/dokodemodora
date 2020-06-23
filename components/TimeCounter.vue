<template lang="pug">
    p.timer-counter.flex.justify-center
        input.text-6xl.text-teal-600.w-24(type="number" :value="state.hour" maxlength="2" min="0" max="24" @change="updateHour")
        span.text-6xl.text-teal-600.mr-2 :
        input.text-6xl.text-teal-600.w-24(type="number" :value="state.minute" maxlength="2" min="0" max="60" @change="updateMinute")
        span.text-6xl.text-teal-600.mr-2 :
        input.text-6xl.text-teal-600.w-24(type="number" :value="state.second" maxlength="2" min="0" max="60" @change="updateSecond")
</template>

<script lang="ts">
import { computed, defineComponent, reactive, SetupContext } from '@vue/composition-api'
import { TimerValues } from 'easytimer.js'

export default defineComponent({
  name: 'TimeCounter',
  props: {
    remainingTime: {
      type: String
    }
  },
  setup(_, context: SetupContext) {
    const state = reactive({
      hour: '00',
      minute: '00',
      second: '00'
    })

    const updateHour = (e: Event) => {
      const $input = e.target as HTMLInputElement
      state.hour = $input.value.padStart(2, '0')
      context.emit('onUpdate', timeObject.value)
    }

    const updateMinute = (e: Event) => {
      const $input = e.target as HTMLInputElement
      state.minute = $input.value.padStart(2, '0')
      context.emit('onUpdate', timeObject.value)
    }

    const updateSecond = (e: Event) => {
      const $input = e.target as HTMLInputElement
      state.second = $input.value.padStart(2, '0')
      context.emit('onUpdate', timeObject.value)
    }

    const timeObject = computed(
      (): TimerValues => {
        return {
          hours: Number(state.hour),
          minutes: Number(state.minute),
          seconds: Number(state.second)
        }
      }
    )

    return {
      state,
      updateHour,
      updateMinute,
      updateSecond
    }
  }
})
</script>

<style scoped lang="stylus"></style>
