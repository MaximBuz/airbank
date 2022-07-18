import { Transaction } from './resolvers/transaction';
import { Category } from './resolvers/category';
import { Account } from './resolvers/account';
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
