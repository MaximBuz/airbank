<template>
  <div class="container mx-auto max-w-3xl h-screen p-20">
    <!-- Header -->
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

    <!-- Body -->
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
            {{ amount }}
            {{ transaction.currency }}
          </p>
        </div>
        <div class="flex flex-col items-center">
          <h3 class="text-xs text-gray-500">Date</h3>
          <p class="text-2xl">
            {{ date }}
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

    <!-- Empty Fallback -->
    <div
      v-else
      class="flex justify-center items-center border rounded-sm shadow-xm mt-2 p-8 bg-white text-lg text-gray-400"
    >
      No transaction found.
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
  head: {
    title: 'Transaction Details',
  },
  computed: {
    date() {
      return dayjs(Number(this.transaction.date)).format('DD. MMMM YYYY')
    },
    amount() {
      return this.transaction.amount.toLocaleString('us-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    },
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
}
</script>

<style>
body {
  background-color: #f7fafc;
}
</style>
