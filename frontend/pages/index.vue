<template>
  <div class="container mx-auto h-screen p-4">
    <h1 class="text-2xl">Transactions</h1>
    <select v-model="accountId" aria-placeholder="Filter by accounts">
      <option :value="undefined">Filter by accounts</option>
      <option v-for="account in accounts" :key="account.id" :value="account.id">{{account.name}}</option>
    </select>
    <input type="month"></input>
    <input type="month"></input>

  <div class="h-5/6 overflow-y-scroll border-t rounded-lg">
    <TransactionTable :sort-asc="sortAsc" :transactions="transactions" @sort="sortAsc = !sortAsc" />
  </div>
  <button v-if="showMoreEnabled" @click="previousPage">Previous Page</button>
  <button v-if="showMoreEnabled" @click="nextPage">Next Page</button>
  </div>
</template>

<script>
import TransactionTable from "~/components/TransactionTable.vue"
import getTransactions from '~/graphql/getTransactions.gql'
import getAllAccounts from '~/graphql/getAllAccounts.gql'

const pageSize = 20
export default {
    name: "IndexPage",
    components: { TransactionTable },
    data() {
        return {
            transactions: [],
            sortAsc: false,
            accountId: undefined,
            startMonth: undefined,
            endMonth: undefined,
            page: 0,
            showMoreEnabled: true,
        };
    },
    head: {
        title: "Transactions"
    },
    computed: {
        skip() {
            return pageSize * this.page;
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
                };
            }
        },
    },
    methods: {
        nextPage() {
            this.page++;
        },
        previousPage() {
            this.page > 0 && this.page--;
        }
    }
}
</script>
