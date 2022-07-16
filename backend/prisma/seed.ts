import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const csv = require('csv-parser');
const fs = require('fs');

export interface AccountRow {
  id: string;
  name: string;
}
export interface CategoryRow {
  id: string;
  name: string;
  color: string;
}
export interface TransactionRow {
  id: string;
  accountId: string;
  categoryId: string | undefined;
  reference: string;
  amount: number;
  currency: string;
  date: string | Date;
}

function getAccounts(): Promise<AccountRow[]> {
  return new Promise((resolve, reject) => {
    const results: AccountRow[] = [];
    fs.createReadStream('./data/accounts.csv')
      .pipe(csv())
      .on('data', (data: AccountRow) => results.push(data))
      .on('error', (err: Error) => reject(err))
      .on('end', () => resolve(results));
  });
}

function getCategories(): Promise<CategoryRow[]> {
  return new Promise((resolve, reject) => {
    const results: CategoryRow[] = [];
    fs.createReadStream('./data/categories.csv')
      .pipe(csv())
      .on('data', (data: CategoryRow) => results.push(data))
      .on('error', (err: Error) => reject(err))
      .on('end', () => resolve(results));
  });
}

function getTransactions(): Promise<TransactionRow[]> {
  return new Promise((resolve, reject) => {
    const results: TransactionRow[] = [];
    fs.createReadStream('./data/transactions.csv')
      .pipe(csv())
      .on('data', (data: TransactionRow) =>
        results.push({
          ...data,
          categoryId: data.categoryId ? data.categoryId : undefined,
          date: new Date(data.date),
        })
      ) // Attention: Prisma complains if this is not parsed correctly!
      .on('error', (err: Error) => reject(err))
      .on('end', () => resolve(results));
  });
}

async function main() {
  const accounts = await getAccounts();
  const categories = await getCategories();
  const transactions = await getTransactions();

  await prisma.account.createMany({ data: accounts });
  console.info('created Accounts...');

  await prisma.category.createMany({ data: categories });
  console.info('created Categories...');

  await prisma.transaction.createMany({ data: transactions });
  console.info('created Transactions...');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('finally');
    await prisma.$disconnect();
  });
