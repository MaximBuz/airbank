<template>
  <div>
    <h1>Transactions</h1>
    <select v-model="accountId" aria-placeholder="Filter by accounts">
      <option>Filter by accounts</option>
      <option v-for="account in accounts" :key="account.id">{{account.name}}</option>
    </select>
    <input type="month"></input>
    <input type="month"></input>

<table class="table-auto border-collapse border border-slate-400">
  <thead>
    <tr >
      <th class="border-collapse border border-slate-400">Reference</th>
      <th class="border-collapse border border-slate-400">Category</th>
      <th class="border-collapse border border-slate-400">Date</th>
      <th class="border-collapse border border-slate-400">Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="transaction in transactions" :key="transaction.id">
      <td class="border-collapse border border-slate-400">{{transaction.reference}}</td>
      <td class="border-collapse border border-slate-400">{{transaction.category.name}}</td>
      <td class="border-collapse border border-slate-400">{{transaction.date}}</td>
      <td class="border-collapse border border-slate-400">{{transaction.amount}}<span>{{transaction.currency}}</span></td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>
import getTransactions from '~/graphql/getTransactions.gql'
import getAllAccounts from '~/graphql/getAllAccounts.gql'
export default {
  name: 'IndexPage',
  data () {
    return {
      transactions: [],
      sortAsc: false,
      accountId: undefined,
      startMonth: undefined,
      endMonth: undefined,
      skip: 0
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
          take: 20,
          skip: this.skip,
        }
      }
    },
  },
  head: {
    title: 'Transactions'
  }
}
</script>
