<template lang="pug">
    div
        GlobalHeader.mb-16
        TimeCounter.my-6(:remaining-time="remainingTime")
        .flex.justify-center
            template(v-if="isStarted")
                AButton.mr-4(:text="'一時停止'" @onClick="handleClickPause")
            template(v-else)
                AButton.mr-4(:text="'スタート'" @onClick="handleClickStart")
            AButton(:text="'リセット'" @onClick="handleClickReset")
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api'
import Timer from 'easytimer.js'
import GlobalHeader from '~/components/GlobalHeader.vue'
import AButton from '~/components/AButton.vue'
import TimeCounter from '~/components/TimeCounter.vue'

export default defineComponent({
  components: {
    AButton,
    TimeCounter,
    GlobalHeader
  },
  setup() {
    const message = ref('This is a message')
    const timer = ref<Timer>(new Timer())
    const remainingTime = ref('00:00:00')
    const isStarted = ref(false)

    const handleClickStart = () => {
      timer.value.start({ countdown: true, startValues: { seconds: 30 } })
      isStarted.value = true
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

    onMounted(() => {
      timer.value.addEventListener('started', updateTime)
      timer.value.addEventListener('secondsUpdated', updateTime)
      timer.value.addEventListener('reset', updateTime)
    })

    return {
      message,
      timer,
      remainingTime,
      isStarted,
      handleClickStart,
      handleClickPause,
      handleClickReset
    }
  }
})
</script>
<style lang="stylus"></style>
