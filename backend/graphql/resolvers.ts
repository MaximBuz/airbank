import { Transaction } from './resolvers/transactions';
import { Category } from './resolvers/categories';
import { Account } from './resolvers/accounts';
import {
  getAccountById,
  getAllCategories,
  getTransactionById,
  getTransactions,
  getAllAccounts
} from './resolvers/queries';

export const resolvers = {
  Query: {
    getAccountById,
    getAllAccounts,
    getAllCategories,
    getTransactionById,
    getTransactions,
  },
  Account,
  Category,
  Transaction,
};
