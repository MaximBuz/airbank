<template>
  <div>
    <h1>Transactions</h1>
    <select aria-placeholder="Filter by accounts">
      <option>Filter by accounts</option>
      <option></option>
      <option></option>
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
    <tr>
      <td class="border-collapse border border-slate-400">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
      <td class="border-collapse border border-slate-400">Malcolm Lockyer</td>
      <td class="border-collapse border border-slate-400">1961</td>
      <td class="border-collapse border border-slate-400">1961</td>
    </tr>
    <tr>
      <td class="border-collapse border border-slate-400">Witchy Woman</td>
      <td class="border-collapse border border-slate-400">The Eagles</td>
      <td class="border-collapse border border-slate-400">1972</td>
      <td class="border-collapse border border-slate-400">1972</td>
    </tr>
    <tr>
      <td class="border-collapse border border-slate-400">Shining Star</td>
      <td class="border-collapse border border-slate-400">Earth, Wind, and Fire</td>
      <td class="border-collapse border border-slate-400">1975</td>
      <td class="border-collapse border border-slate-400">1975</td>
    </tr>
  </tbody>
</table>

  </div>
</template>

<script>
import getTransactions from '~/graphql/getTransactions.gql'
export default {
  name: 'IndexPage',
  apollo: {
    getTransactions: {
      prefetch: true,
      query: getTransactions
    }
  },
  head: {
    title: 'Transactions'
  }
}
</script>
