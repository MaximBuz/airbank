import { Context } from '../../context';
import { Prisma } from '@prisma/client';

export async function getAccountById(_parent: undefined, _args: { id: string }, context: Context) {
  const account = await context.prisma.account.findFirst({
    where: { id: _args.id },
    include: { transactions: true },
  });
  return account;
}

export async function getAllAccounts(_parent: undefined, _args: undefined, context: Context) {
  const accounts = await context.prisma.account.findMany();
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
    cursor?: string;
  },
  context: Context
) {
  // Grabbing arguments and providing defaults
  const sortAsc = _args.sortAsc || false;
  const accountId = _args.accountId || undefined;
  const startMonth = _args.startMonth || '01-2022'; // those have to be transformed into dates!
  const endMonth = _args.endMonth || '12-2022'; // those have to be transformed into dates!
  const take = _args.take || 20;
  const cursor = _args.cursor || null;

  const searchParams: Prisma.TransactionFindManyArgs = {
    take,
    where: { accountId, date: { lte: new Date(endMonth), gte: new Date(startMonth) } },
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
