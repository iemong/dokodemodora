<template lang="pug">
    p.timer-counter.flex.justify-center
        input.text-6xl.text-blue-600.w-24(type="number" :value="state.hour" maxlength="2" min="0" max="24" @blur="updateHour" @input="changeHour" :readonly="isReadOnly")
        span.text-6xl.text-blue-600.mr-2 :
        input.text-6xl.text-blue-600.w-24(type="number" :value="state.minute" maxlength="2" min="0" max="60" :readonly="isReadOnly" @input="changeMinute" @blur="updateMinute")
        span.text-6xl.text-blue-600.mr-2 :
        input.text-6xl.text-blue-600.w-24(type="number" :value="state.second" maxlength="2" min="0" max="60" @input="changeSecond" @blur="updateSecond" :readonly="isReadOnly")
</template>

<script lang="ts">
import { computed, defineComponent, reactive, SetupContext, watch } from '@vue/composition-api'
import { TimerValues } from 'easytimer.js'

type Props = {
  remainingTime: string
  isReadOnly: boolean
}

export default defineComponent({
  name: 'TimeCounter',
  props: {
    remainingTime: {
      type: String
    },
    isReadOnly: {
      type: Boolean
    }
  },
  setup(props: Props, context: SetupContext) {
    const state = reactive<{
      hour: string | number
      minute: string | number
      second: string | number
    }>({
      hour: '00',
      minute: '00',
      second: '00'
    })

    const changeHour = (e: Event) => {
      const $input = e.target as HTMLInputElement
      const num = Number($input.value)
      if (num < 0) {
        state.hour = 0
      } else if (num >= 24) {
        state.hour = 24
      } else {
        state.hour = num
      }
    }

    const updateHour = (e: Event) => {
      const $input = e.target as HTMLInputElement
      state.hour = $input.value.padStart(2, '0')
      context.emit('onUpdate', timeObject.value)
    }

    const changeMinute = (e: Event) => {
      const $input = e.target as HTMLInputElement
      const num = Number($input.value)
      if (num < 0) {
        state.minute = 0
      } else if (num >= 60) {
        state.minute = 60
      } else {
        state.minute = num
      }
    }

    const updateMinute = (e: Event) => {
      const $input = e.target as HTMLInputElement
      state.minute = $input.value.padStart(2, '0')
      context.emit('onUpdate', timeObject.value)
    }

    const changeSecond = (e: Event) => {
      const $input = e.target as HTMLInputElement
      const num = Number($input.value)
      if (num < 0) {
        state.second = 0
      } else if (num >= 60) {
        state.second = 60
      } else {
        state.second = num
      }
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

    watch(
      () => props.remainingTime,
      (time: string) => {
        const arr = time.split(':')
        state.hour = arr[0].padStart(2, '0')
        state.minute = arr[1].padStart(2, '0')
        state.second = arr[2].padStart(2, '0')
      }
    )

    return {
      state,
      changeHour,
      updateHour,
      changeMinute,
      updateMinute,
      changeSecond,
      updateSecond
    }
  }
})
</script>

<style scoped lang="stylus"></style>
