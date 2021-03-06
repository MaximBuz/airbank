import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Account {
    id: String!
    name: String!
    transactions: [Transaction]
  }
  type Category {
    id: String!
    name: String!
    color: String
    transactions: [Transaction]
  }
  type Transaction {
    id: String!
    account: Account!
    accountId: String!
    category: Category
    categoryId: String
    reference: String
    amount: Float!
    currency: String!
    date: String!
  }
  type Query {
    getAccountById(id: String!): Account
    getAllCategories: [Category]
    getAllAccounts(withTransactions: Boolean): [Account]
    getTransactionById(id: String!): Transaction
    getTransactions(
      sortAsc: Boolean
      accountId: String
      startMonth: String
      endMonth: String
      take: Int
      skip: Int
    ): [Transaction]
  }
`;
