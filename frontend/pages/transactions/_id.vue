<template>
  <div class="container mx-auto max-w-3xl h-screen p-20">
    <div class="flex justify-between">
      <p
        class="text-gray-300 transition-all cursor-pointer text-sm hover:text-blue-400"
        @click="$router.go(-1)"
      >
        Back
      </p>
      <p class="text-gray-300 transition-all text-sm">
        {{ $route.params.id }}
      </p>
    </div>
    <div
      v-if="transaction"
      class="overflow-y-scroll border rounded-sm shadow-xm mt-2 p-8 bg-white"
    >
      <div class="flex justify-between">
        <div>
          <h1 class="text-4xl">Transaction</h1>
        </div>
        <CategoryPill :category="transaction.category" />
      </div>
      <div class="border-b my-4 h-0 text-center"></div>
      <div class="flex justify-around">
        <div class="flex flex-col items-center">
          <h3 class="text-xs text-gray-500">Amount</h3>
          <p :class="transaction.amount < 0 && 'text-red-400'" class="text-2xl">
            {{
              transaction.amount.toLocaleString('us-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
            {{ transaction.currency }}
          </p>
        </div>
        <div class="flex flex-col items-center">
          <h3 class="text-xs text-gray-500">Date</h3>
          <p class="text-2xl">
            {{ showDate(transaction.date) }}
          </p>
        </div>
      </div>
      <div class="border-b my-4 h-0 text-center"></div>
      <div>
        <h4 class="text-xs text-gray-500">Account Name</h4>
        <p class="text-lg">{{ transaction.account.name }}</p>
        <h4 class="text-xs text-gray-500 mt-2">Reference</h4>
        <p class="text-lg">
          {{ transaction.reference || 'No reference provided' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import getTransactionById from '~/graphql/getTransactionById.gql'
import CategoryPill from '~/components/CategoryPill.vue'

export default {
  name: 'TransactionDetailPage',
  components: { CategoryPill },
  data() {
    return {
      transaction: null,
    }
  },
  apollo: {
    transaction: {
      prefetch: true,
      query: getTransactionById,
      variables() {
        return {
          id: this.$route.params.id,
        }
      },
    },
  },
  head: {
    title: 'Transaction Details',
  },
  methods: {
    showDate(timesamp) {
      return dayjs(Number(timesamp)).format('DD. MMMM YYYY')
    },
  },
}
</script>

<style>
body {
  background-color: #f7fafc;
}
</style>
