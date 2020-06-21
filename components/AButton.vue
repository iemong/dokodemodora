<template lang="pug">
    button(class='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded' @click="handleClick") {{ text }}
    
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

type Props = {
  text: string
}

export default defineComponent({
  name: 'AButton',
  props: {
    text: {
      type: String
    }
  },
  setup(_: Props, context: SetupContext) {
    const handleClick = () => {
      context.emit('onClick')
    }

    return { handleClick }
  }
})
</script>

<style scoped lang="stylus"></style>
