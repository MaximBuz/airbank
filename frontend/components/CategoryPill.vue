<template>
  <div
    :style="{ backgroundColor: getColor(category.color) }"
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
  methods: {
    getColor(color) {
      if (!color) return '#f3f4f6'
      return tinycolor('#' + color)
        .brighten(15)
        .toString()
    },
  },
}
</script>
