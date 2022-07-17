<template>
  <div class="container mx-auto h-screen p-4 text-xs">
    <div class="relative z-10 flex justify-between items-center mb-1">
      
      <!-- Filtering -->
      <div class="flex flex-col items-start">
        <label class="text-gray-400" for="account">Account</label>
        <select
          id="account"
          v-model="accountId"
          class="w-60 appearance-none text-gray-400 rounded-sm border h-10 px-3 focus:outline-none focus:border-blue-400 focus:border hover:border-gray-300 hover:bg-gray-50 text-sm"
          type="button"
        >
          <option :value="undefined">No Filter</option>
          <option
            v-for="account in accounts"
            :key="account.id"
            :value="account.id"
          >
            {{ account.name }}
          </option>
        </select>
      </div>

      <div class="flex gap-1">
        <div class="flex flex-col items-start">
          <label class="text-gray-400" for="start-month">From month</label>
          <input
            v-model="fromMonth"
            class="cursor-pointer text-gray-400 appearance-none rounded-sm border h-10 px-3 focus:outline-none focus:border-blue-300 focus:border hover:border-gray-300 hover:bg-gray-50 text-sm placeholder-gray-50::placeholder"
            type="month"
          />
        </div>
        <div class="flex flex-col items-start">
          <label class="text-gray-400" for="end-month">To month</label>
          <input
            v-model="toMonth"
            class="cursor-pointer text-gray-400 appearance-none rounded-sm border h-10 px-3 focus:outline-none focus:border-blue-400 focus:border hover:border-gray-300 hover:bg-gray-50 text-sm placeholder-gray-50::placeholder"
            type="month"
          />
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="h-5/6 overflow-y-scroll border rounded-sm shadow-xm bg-white">
      <TransactionTable
        class="relative z-0"
        :sort-asc="Boolean(sortAsc)"
        :transactions="transactions"
        @sort="changeSortDirection"
        @reset="resetFilter"
      />
    </div>

    <!-- PageButtons -->
    <div class="flex align-center justify-end gap-1 mt-1">
      <button
        :disabled="page == 0"
        class="disabled:opacity-30 disabled:cursor-not-allowed rounded-sm border border-gray-300 p-2 bg-white hover:border-gray-400 hover:bg-gray-50"
        @click="previousPage"
      >
        <svg
          viewBox="64 64 896 896"
          width="1em"
          height="1em"
          fill="#6A7280"
        >
          <path
            d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"
          ></path>
        </svg>
      </button>
      <button
        class="w-8 cursor-default rounded-sm border bg-white border-blue-400 text-blue-400 p-2"
      >
        {{ page }}
      </button>
      <button
        :disabled="transactions.length < 20"
        class="disabled:opacity-30 disabled:cursor-not-allowed rounded-sm border border-gray-300 p-2 bg-white hover:border-gray-400 hover:bg-gray-50"
        @click="nextPage"
      >
        <svg
          viewBox="64 64 896 896"
          width="1em"
          height="1em"
          fill="#6A7280"
        >
          <path
            d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import TransactionTable from '~/components/TransactionTable.vue'
import getTransactions from '~/graphql/getTransactions.gql'
import getAllAccounts from '~/graphql/getAllAccounts.gql'

const pageSize = 20
export default {
  name: 'IndexPage',
  components: {
    TransactionTable,
  },
  /* Reactive State */
  data() {
    return {
      transactions: [],
      sortAsc: Boolean(this.$route.query.sortAsc) || undefined,
      accountId: this.$route.query.accountId || undefined,
      fromMonth:
        this.$route.query.fromMonth || `${new Date().getFullYear()}-01`,
      toMonth:
        this.$route.query.toMonth ||
        `${new Date().getFullYear()}-${String(
          new Date().getMonth() + 1
        ).padStart(2, '0')}`,
      page: this.$route.query.page || 0,
    }
  },
  head: {
    title: 'Transactions',
  },
  computed: {
    skip() {
      return pageSize * this.page
    },
    filter() {
      return {
        sortAsc: this.sortAsc,
        accountId: this.accountId,
        fromMonth: this.fromMonth,
        toMonth: this.toMonth,
        page: this.page,
      }
    },
  },
  /* Persisting Filter state when coming back */
  watch: {
    filter() {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.filter,
          sortAsc: this.filter.sortAsc ? true : undefined,
        },
      })
    },
  },
  /* Reactive GraphQL Queries */
  apollo: {
    accounts: {
      prefetch: true,
      query: getAllAccounts,
    },
    transactions: {
      prefetch: true,
      query: getTransactions,
      variables() {
        return {
          sortAsc: this.sortAsc,
          accountId: this.accountId,
          startMonth: this.fromMonth,
          endMonth: this.toMonth,
          take: pageSize,
          skip: this.skip,
        }
      },
    },
  },
  methods: {
    nextPage() {
      this.transactions.length > 0 && this.page++
    },
    previousPage() {
      this.page > 0 && this.page--
    },
    changeSortDirection() {
      this.page = 0
      this.sortAsc = !this.sortAsc
    },
    resetFilter() {
      this.sortAsc = false
      this.accountId = undefined
      this.fromMonth = `${new Date().getFullYear()}-01`
      this.toMonth = `${new Date().getFullYear()}-${String(
        new Date().getMonth() + 1
      ).padStart(2, '0')}`
      this.take = pageSize
      this.skip = 0
    },
  },
}
</script>
<style>
body {
  background-color: #f7fafc;
}
</style>
