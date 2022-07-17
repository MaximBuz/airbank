<template>
  <div class="container mx-auto h-screen p-4">
    <h1 class="text-2xl">Transactions</h1>
    <select v-model="accountId" aria-placeholder="Filter by accounts">
      <option :value="undefined">Filter by accounts</option>
      <option v-for="account in accounts" :key="account.id" :value="account.id">{{account.name}}</option>
    </select>
    <input type="month"></input>
    <input type="month"></input>

  <div class="h-5/6 overflow-y-scroll border-t">
    <table class="h-full table-fixed w-full text-xs font-light text-left">
      <thead class="sticky top-0 z-10 bg-white shadow-sm">
        <tr class="font-medium  p-4 pl-8 pt-0 pb-3 text-gray-400 text-left">
          <th class="w-2/5 p-4 pl-8 border-b font-normal">Reference</th>
          <th class="w-1/5 pl-8 border-b font-normal">Category</th>
          <th class="w-1/6 pl-8 border-b font-normal">Date</th>
          <th class="w-1/8 p-4 pl-8 border-b font-normal text-right">Amount</th>
          <th class="p-4 pl-8 border-b font-normal"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions" :key="transaction.id" class="bg-white hover:bg-blue-50">
          <td v-if="transaction.reference" class="p-4 pl-8 border-gray-100 border-b">{{transaction.reference}}</td>
          <td v-else class="p-4 pl-8 border-gray-100 text-gray-300 border-b">No reference provided</td>
          <td class="p-4 pl-8 border-gray-100 border-b"><div :style="{backgroundColor:getColor(transaction.category.color)}" class="rounded-md p-2 max-w-max sepia">{{transaction.category.name}}</div></td>
          <td class="p-4 pl-8 border-gray-100 border-b">{{showDate(transaction.date)}}</td>
          <td class="p-4 pl-8 border-gray-100 border-b text-right">{{transaction.amount.toLocaleString('us-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}} <span class="text-gray-400">{{transaction.currency}}</span></td>
          <td class="p-4 pl-8 border-gray-100 border-b"><NuxtLink :to="`transactions/${transaction.id}`"></NuxtLink></td>
        </tr>
      </tbody>
    </table>
  </div>
  <button v-if="showMoreEnabled" @click="previousPage">Previous Page</button>
  <button v-if="showMoreEnabled" @click="nextPage">Next Page</button>
  </div>
</template>

<script>
import dayjs from "dayjs";
import tinycolor from "tinycolor2";
import getTransactions from '~/graphql/getTransactions.gql'
import getAllAccounts from '~/graphql/getAllAccounts.gql'

const pageSize = 20
export default {
  name: 'IndexPage',
  data () {
    return {
      transactions: [],
      sortAsc: false,
      accountId: undefined,
      startMonth: undefined,
      endMonth: undefined,
      page: 0,
      showMoreEnabled: true,
    }
  }, 
  head: {
    title: 'Transactions'
  },
  computed: {
    skip () {
      return pageSize * this.page
    }
  },
  apollo: {
    accounts: {
      prefetch: true,
      query: getAllAccounts
    },
    transactions: {
      prefetch: true,
      query: getTransactions,
      variables() {
        return {
          sortAsc: this.sortAsc,
          accountId: this.accountId,
          startMonth: this.startMonth,
          endMonth: this.endMonth,
          take: pageSize,
          skip: this.skip,
        }
      }
    },
  },
  methods: {
    nextPage () {
      this.page++
    },
    previousPage () {
      this.page > 0 && this.page--;
    },
    showDate (timesamp) {
      return dayjs(Number(timesamp)).format("D/M/YYYY")
    },
    getColor (color) {
      if (!color)
        return "#f3f4f6"
      return tinycolor("#" + color).brighten(15).toString();
    }
  },
}
</script>
