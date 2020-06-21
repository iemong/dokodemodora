<template lang="pug">
    p.timer-counter.text-center
        time.text-6xl.text-teal-600 {{ remainingTime }}
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'TimeCounter',
  props: {
    remainingTime: {
      type: String
    }
  }
})
</script>

<style scoped lang="stylus"></style>
