import { Context } from '../../context';
import { Prisma } from '@prisma/client';

export async function getAccountById(_parent: undefined, _args: { id: string }, context: Context) {
  const account = await context.prisma.account.findFirst({
    where: { id: _args.id },
    include: { transactions: true },
  });
  return account;
}

export async function getAllAccounts(
  _parent: undefined,
  _args: { withTransactions: boolean },
  context: Context
) {
  const accounts = await context.prisma.account.findMany({
    include: { transactions: _args.withTransactions || false },
  });
  return accounts;
}

export async function getAllCategories(_parent: undefined, _args: undefined, context: Context) {
  const categories = await context.prisma.category.findMany();
  return categories;
}

export async function getTransactionById(_parent: undefined, _args: { id: string }, context: Context) {
  const transaction = await context.prisma.transaction.findFirst({
    where: { id: _args.id },
    include: { category: true, account: true },
  });
  return transaction;
}

export async function getTransactions(
  _parent: undefined,
  _args: {
    sortAsc?: boolean;
    accountId?: string;
    startMonth?: string;
    endMonth?: string;
    take?: number;
    skip?: number;
  },
  context: Context
) {
  // Grabbing arguments and providing defaults
  const sortAsc = _args.sortAsc || false;
  const accountId = _args.accountId || undefined;
  const take = _args.take || 20;
  const skip = _args.skip || 0;

  const startMonth = _args.startMonth
    ? new Date(Number(_args.startMonth.split('-')[1]), Number(_args.startMonth.split('-')[0]))
    : new Date(new Date().getFullYear());

  const endMonth = _args.endMonth
    ? new Date(Number(_args.endMonth.split('-')[1]), Number(_args.endMonth.split('-')[0]))
    : new Date(new Date().getFullYear(), new Date().getMonth());

  const searchParams: Prisma.TransactionFindManyArgs = {
    take,
    skip,
    where: { accountId, date: { lte: endMonth, gte: startMonth } },
    orderBy: { date: sortAsc ? 'asc' : 'desc' },
  };
  const transactions = await context.prisma.transaction.findMany(searchParams);
  return transactions;
}
