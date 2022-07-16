import { Transaction } from './resolvers/transactions';
import { Category } from './resolvers/categories';
import { Account } from './resolvers/accounts';
import {
  getAccountById,
  getAllCategories,
  getTransactionById,
  getTransactions,
} from './resolvers/queries';

export const resolvers = {
  Query: {
    getAccountById,
    getAllCategories,
    getTransactionById,
    getTransactions,
  },
  Account,
  Category,
  Transaction,
};
