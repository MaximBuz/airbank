import { Category as CategoryType } from '@prisma/client';
import { Context } from '../../context';

export const Category = {
  async transactions(_parent: CategoryType, _args: undefined, context: Context) {
    const transactions = await context.prisma.transaction.findMany({
      where: { accountId: _parent.id },
      orderBy: { date: 'desc' },
      include: { account: true },
    });
    return transactions;
  },
};
