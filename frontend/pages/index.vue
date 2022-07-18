<template>
  <div class="container mx-auto h-screen p-4 text-xs">
    <div class="relative z-10 flex justify-between items-center mb-1">
      <!-- AccountFilter -->
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

      <!-- MonthFilter -->
      <div class="flex gap-1">
        <div class="flex flex-col items-start">
          <label class="text-gray-400" for="from-month">From month</label>
          <input
            id="from-month"
            v-model="fromMonth"
            class="cursor-pointer text-gray-400 appearance-none rounded-sm border h-10 px-3 focus:outline-none focus:border-blue-300 focus:border hover:border-gray-300 hover:bg-gray-50 text-sm placeholder-gray-50::placeholder"
            type="month"
          />
        </div>
        <div class="flex flex-col items-start">
          <label class="text-gray-400" for="to-month">To month</label>
          <input
            id="to-month"
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
    <div class="flex align-center justify-end mt-1">
      <PaginationButtons
        :page="page"
        :back-disabled="page == 0"
        :next-disabled="transactions.length < 20"
        @next="nextPage"
        @back="previousPage"
      />
    </div>
  </div>
</template>

<script>
import PaginationButtons from '~/components/PaginationButtons.vue'
import TransactionTable from '~/components/TransactionTable.vue'
import getTransactions from '~/graphql/getTransactions.gql'
import getAllAccounts from '~/graphql/getAllAccounts.gql'

const pageSize = 20
export default {
  name: 'IndexPage',
  components: {
    TransactionTable,
    PaginationButtons,
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
  /* GraphQL */
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
