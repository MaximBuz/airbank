<template>
  <table class="table-fixed w-full text-xs font-light text-left">
    <!-- Table Head -->
    <thead class="sticky top-0 z-10 bg-gray-50 shadow-sm">
      <tr class="font-medium pl-8 pt-0 pb-3 text-gray-400 text-left">
        <th class="w-2/6 p-4 pl-8 border-b font-normal">Reference</th>
        <th class="w-2/6 pl-8 border-b font-normal">Category</th>
        <th
          class="px-8 border-b font-normal hover:bg-gray-100 cursor-pointer"
          @click="$emit('sort')"
        >
          <div class="flex items-center gap-1.5">
            Date
            <svg
              viewBox="0 0 1024 1024"
              width="0.9em"
              height="0.9em"
              :fill="sortAsc ? '#60a5fa' : '#6b7280'"
            >
              <path
                v-if="sortAsc"
                d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
              ></path>
              <path
                v-else
                d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
              ></path>
            </svg>
          </div>
        </th>
        <th class="p-4 pl-8 border-b font-normal text-right">Amount</th>
        <th class="w-20 border-b font-normal"></th>
      </tr>
    </thead>

    <!-- Table Body -->
    <tbody class="w-full">
      <tr
        v-for="transaction in transactions"
        :key="transaction.id"
        class="bg-white hover:bg-gray-50"
      >
        <td
          v-if="transaction.reference"
          class="p-4 pl-8 border-gray-100 border-b"
        >
          {{ transaction.reference }}
        </td>
        <td v-else class="p-4 pl-8 border-gray-100 text-gray-300 border-b">
          No reference provided
        </td>
        <td class="p-4 pl-8 border-gray-100 border-b hover:scale-105">
          <CategoryPill v-if="transaction" :category="transaction.category" />
        </td>
        <td class="p-4 pl-8 border-gray-100 border-b">
          {{ showDate(transaction.date) }}
        </td>
        <td class="p-4 pl-8 border-gray-100 border-b text-right">
          {{ getAmount(transaction.amount) }}
          <span class="text-gray-400">{{ transaction.currency }}</span>
        </td>

        <!-- Link to Transaction Detail Page -->
        <td class="border-gray-100 border-b">
          <NuxtLink :to="`transactions/${transaction.id}`">
            <div class="w-full flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 m-auto"
                viewBox="0 0 20 20"
                fill="#d1d5db"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </NuxtLink>
        </td>
      </tr>
    </tbody>

    <!-- Empty Fallback -->
    <div
      v-if="transactions.length === 0"
      class="absolute flex w-full h-5/6 text-lg text-gray-400 justify-center items-center align-center text-center"
    >
      <p>
        No transactions found. Consider
        <span
          class="text-blue-400 underline cursor-pointer"
          @click="$emit('reset')"
          >resetting</span
        >
        your filters.
      </p>
    </div>
  </table>
</template>

<script>
import dayjs from 'dayjs'
import tinycolor from 'tinycolor2'
import CategoryPill from './CategoryPill.vue'

export default {
  name: 'TransactionTable',
  components: [CategoryPill],
  props: {
    transactions: { type: Array, default: () => [] },
    sortAsc: Boolean,
  },
  emits: ['sort', 'reset'],
  methods: {
    showDate(timesamp) {
      return dayjs(Number(timesamp)).format('D/M/YYYY')
    },
    getAmount(number) {
      return number.toLocaleString('us-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    },
  },
}
</script>
