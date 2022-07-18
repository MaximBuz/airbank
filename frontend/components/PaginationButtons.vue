<template>
  <div class="flex align-center gap-1">
    <!-- Back Button -->
    <button
      :disabled="backDisabled"
      class="disabled:opacity-30 disabled:cursor-not-allowed rounded-sm border border-gray-300 p-2 bg-white hover:border-gray-400 hover:bg-gray-50"
      @click="$emit('back')"
    >
      <svg viewBox="64 64 896 896" width="1em" height="1em" fill="#6A7280">
        <path
          d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"
        ></path>
      </svg>
    </button>

    <!-- Page Number -->
    <div
      class="w-8 cursor-default flex items-center justify-center rounded-sm border bg-white border-blue-400 text-blue-400 p-2"
    >
      {{ page }}
    </div>

    <!-- Next Button -->
    <button
      :disabled="nextDisabled"
      class="disabled:opacity-30 disabled:cursor-not-allowed rounded-sm border border-gray-300 p-2 bg-white hover:border-gray-400 hover:bg-gray-50"
      @click="$emit('next')"
    >
      <svg viewBox="64 64 896 896" width="1em" height="1em" fill="#6A7280">
        <path
          d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    backDisabled: Boolean,
    nextDisabled: Boolean,
    page: {
      type: Number,
      default: 0,
    },
  },
  emits: ['back', 'next']
}
</script>

<style></style>
