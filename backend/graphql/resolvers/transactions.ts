import { Transaction as TransactionType } from '@prisma/client';
import { Context } from '../../context';

export const Transaction = {
  async account(_parent: TransactionType, _args: any, context: Context) {
    const account = await context.prisma.account.findFirst({
      where: { id: _parent.accountId },
    });
    return account;
  },
  async category(_parent: TransactionType, _args: any, context: Context) {
    const category = await context.prisma.category.findFirst({
      where: { id: _parent.categoryId || undefined },
    });
    return category;
  },
};
