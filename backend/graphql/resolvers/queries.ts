import { Context } from '../../context';
import { Prisma } from '@prisma/client';

export async function getAccountById(_parent: undefined, _args: { id: string }, context: Context) {
  const account = await context.prisma.account.findFirst({
    where: { id: _args.id },
    include: { transactions: true },
  });
  return account;
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
    cursor?: string;
  },
  context: Context
) {
  // Grabbing arguments and providing defaults
  const sortAsc = _args.sortAsc || false;
  const accountId = _args.accountId || undefined;
  const take = _args.take || 20;
  const cursor = _args.cursor || null;

  const startMonth = _args.startMonth
    ? new Date(Number(_args.startMonth.split('-')[1]), Number(_args.startMonth.split('-')[0]))
    : new Date(new Date().getFullYear());
  
  const endMonth = _args.endMonth
    ? new Date(Number(_args.endMonth.split('-')[1]), Number(_args.endMonth.split('-')[0]))
    : new Date(new Date().getFullYear(), new Date().getMonth());

  console.log(startMonth, endMonth);
  
  const searchParams: Prisma.TransactionFindManyArgs = {
    take,
    where: { accountId, date: { lte: endMonth, gte: startMonth } },
    orderBy: { date: sortAsc ? 'asc' : 'desc' },
  };

  if (cursor) {
    searchParams.cursor = {
      id: cursor,
    };
    searchParams.skip = 1;
  }

  const transactions = await context.prisma.transaction.findMany(searchParams);
  return transactions;
}
