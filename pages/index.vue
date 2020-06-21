<template lang="pug">
  div
    p.text-red-700 {{ message }}
    button(class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded') button
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const message = ref('This is a message')

    return {
      message
    }
  }
})
</script>
<style lang="stylus"></style>
