import { PrismaClient, Account, Category, Transaction } from '@prisma/client';
const prisma = new PrismaClient();
const csv = require('csv-parser');
const fs = require('fs');

function getAccounts(): Promise<Account[]> {
  return new Promise((resolve, reject) => {
    const results: Account[] = [];
    fs.createReadStream('./data/accounts.csv')
      .pipe(csv())
      .on('data', (data: Account) => results.push(data))
      .on('error', (err: Error) => reject(err))
      .on('end', () => resolve(results));
  });
}

function getCategories(): Promise<Category[]> {
  return new Promise((resolve, reject) => {
    const results: Category[] = [];
    fs.createReadStream('./data/categories.csv')
      .pipe(csv())
      .on('data', (data: Category) => results.push(data))
      .on('error', (err: Error) => reject(err))
      .on('end', () => resolve(results));
  });
}

function getTransactions(): Promise<Transaction[]> {
  return new Promise((resolve, reject) => {
    const results: Transaction[] = [];
    fs.createReadStream('./data/transactions.csv')
      .pipe(csv())
      .on('data', (data: Transaction) =>
        results.push({
          ...data,
          categoryId: data.categoryId ? data.categoryId : null,
          date: new Date(data.date), // Attention: Prisma complains if this is not parsed correctly!
        })
      )
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
    console.log('...done!');
    await prisma.$disconnect();
  });
