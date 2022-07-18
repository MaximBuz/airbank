<template>
  <div
    :style="{ backgroundColor: color }"
    class="rounded-md p-2 flex justify-center items-center max-w-max max-h-max sepia"
  >
    {{ category.name }}
  </div>
</template>

<script>
import tinycolor from 'tinycolor2'
export default {
  props: {
    category: {
      type: Object,
      default: () => ({
        color: String,
        name: String,
      }),
    },
  },
  computed: {
    color() {
      if (!this.category.color) return '#f3f4f6'
      return tinycolor('#' + this.category.color)
        .brighten(15)
        .toString()
    },
  },
}
</script>
