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
import alarm from '~/assets/sounds/alarm.mp3'
import hakushu from '~/assets/sounds/hakushu.mp3'
import mario from '~/assets/sounds/mario.mp3'
import hotaru from '~/assets/sounds/hotaru.mp3'
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
    const sound = reactive<{
      uho: Howl | null
      dora: Howl | null
      alarm: Howl | null
      hakushu: Howl | null
      mario: Howl | null
      hotaru: Howl | null
    }>({
      uho: null,
      dora: null,
      alarm: null,
      hakushu: null,
      mario: null,
      hotaru: null
    })
    const rangeValue = ref<number|string>(3)

    const timeObject = ref<TimerValues>({ seconds: 30 })

    const updateTimeObject = (value: TimerValues) => {
      timeObject.value = value
    }

    const handleClickStart = () => {
      timer.value.start({ countdown: true, startValues: timeObject.value })
      isStarted.value = true
      if (sound.dora) sound.dora.play()
    }

    const handleClickPause = () => {
      timer.value.pause()
      isStarted.value = false
    }

    const handleClickReset = () => {
      timer.value.reset()
      timer.value.stop()
      isStarted.value = false

      sound.mario?.stop()
      sound.uho?.stop()
      sound.hotaru?.stop()
      sound.alarm?.stop()
      sound.hakushu?.stop()
      sound.dora?.stop()
    }

    const updateTime = () => {
      const remaining = timer.value.getTimeValues().toString()
      remainingTime.value = remaining
      console.log(remaining)
      if(remaining === '00:01:40' && rangeValue.value === '2') {
        sound.mario?.play()
      }
    }

    const playUho = async () => {
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

    const finish = async () => {
      switch (Number(rangeValue.value)) {
        case 1: // 蛍の光
          if (sound.hotaru) sound.hotaru.play()
          break
        case 4: // 拍手
          if (sound.hakushu) sound.hakushu.play()
          break
        case 5: // ゴリラ
          await playUho()
          break
        default:
          if (sound.alarm) sound.alarm.play()
          break
      }
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
      sound.alarm = new Howl({
        src: [alarm]
      })
      sound.hakushu = new Howl({
        src: [hakushu]
      })
      sound.mario = new Howl({
        src: [mario]
      })
      sound.hotaru = new Howl({
        src: [hotaru]
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
