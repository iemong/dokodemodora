<template lang="pug">
    div
        GlobalHeader.mb-16
        TimeCounter.my-6(:remaining-time="remainingTime" @onUpdate="updateTimeObject" :is-read-only="isStarted")
        .flex.justify-center
            template(v-if="isStarted")
                AButton.mr-4(:text="'一時停止'" @onClick="handleClickPause")
            template(v-else)
                AButton.mr-4(:text="'スタート'" @onClick="handleClickStart")
            AButton(:text="'リセット'" @onClick="handleClickReset")
        .level.flex.justify-center.align-center.mt-4
            input.mr-4(type="range" v-model="rangeValue" step="1" max="5" min="1")
            label.text-blue-600.text-lg 緊急度 {{ rangeValue }}
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from '@vue/composition-api'
import Timer, { TimerValues } from 'easytimer.js'
import { Howl } from 'howler'
import GlobalHeader from '~/components/GlobalHeader.vue'
import AButton from '~/components/AButton.vue'
import TimeCounter from '~/components/TimeCounter.vue'
import uho from '~/assets/sounds/uho.mp3'
import ban from '~/assets/sounds/ban1.mp3'
import delay from '~/assets/utils/delay'
export default defineComponent({
  components: {
    AButton,
    TimeCounter,
    GlobalHeader
  },
  setup() {
    const timer = ref<Timer>(new Timer())
    const remainingTime = ref('00:00:00')
    const isStarted = ref(false)
    const sound = reactive<{ uho: Howl | null; dora: Howl | null }>({
      uho: null,
      dora: null
    })
    const rangeValue = ref(3)

    const timeObject = ref<TimerValues>({ seconds: 30 })

    const updateTimeObject = (value: TimerValues) => {
      timeObject.value = value
    }

    const handleClickStart = () => {
      timer.value.start({ countdown: true, startValues: timeObject.value })
      isStarted.value = true
      sound.dora?.play()
    }

    const handleClickPause = () => {
      timer.value.pause()
      isStarted.value = false
    }

    const handleClickReset = () => {
      timer.value.reset()
      timer.value.stop()
      isStarted.value = false
    }

    const updateTime = () => {
      remainingTime.value = timer.value.getTimeValues().toString()
    }

    const finish = async () => {
      // Gollila part
      if (!sound.uho) return
      sound.uho.play()
      await delay(2000)
      sound.uho.play()
      await delay(1000)
      sound.uho.play()
      await delay(400)
      sound.uho.play()
      await delay(800)
      sound.uho.play()
      await delay(200)
      sound.uho.play()
      await delay(300)
      sound.uho.play()
    }

    onMounted(() => {
      timer.value.addEventListener('started', updateTime)
      timer.value.addEventListener('secondsUpdated', updateTime)
      timer.value.addEventListener('reset', updateTime)
      timer.value.addEventListener('targetAchieved', finish)

      sound.uho = new Howl({
        src: [uho]
      })
      sound.dora = new Howl({
        src: [ban]
      })
    })

    return {
      timer,
      remainingTime,
      isStarted,
      timeObject,
      handleClickStart,
      handleClickPause,
      handleClickReset,
      updateTimeObject,
      rangeValue
    }
  }
})
</script>
<style lang="stylus"></style>
